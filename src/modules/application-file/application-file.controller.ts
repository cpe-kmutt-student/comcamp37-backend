import { Body, Controller, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { FileType } from "generated/prisma/enums";
import { RegisterPeriodGuard } from "src/common/guards/register-period.guard";
import { ApplicationFileService } from "./application-file.service";
import { ApplicationFileDto } from "./dto/application-file.dto";
import { ApplicationFileByTypeResponseDto, ApplicationFileResponseDto, ApplicationFileUploadResponseDto } from "./dto/application-file-response.dto";

@ApiTags("Application File")
@Controller("/api/application/file")
export class ApplicationFileController {
	constructor(private readonly applicationFileService: ApplicationFileService) {}

	@Get("/:id")
	@ApiOperation({
		description: "Retrieve all files for a specific application",
	})
	@ApiParam({
		name: "id",
		description: "The application ID (UUID)",
		example: "550e8400-e29b-41d4-a716-446655440000",
	})
	@ApiResponse({
		status: 200,
		description: "Successfully retrieved all application files",
		type: [ApplicationFileResponseDto],
	})
	@ApiResponse({
		status: 404,
		description: "No files found for this application",
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	getApplicationFiles(@Session() session: UserSession, @Param("id") appId: string) {
		return this.applicationFileService.getApplicationFiles(session.user.id, appId);
	}

	@Post("/upload")
	@UseGuards(RegisterPeriodGuard)
	@UseInterceptors(FileInterceptor("file"))
	@ApiOperation({
		description: `Upload a file for an application. Max file size is 3MB. Supported file types: ${Object.values(FileType).join(", ")}`,
	})
	@ApiConsumes("multipart/form-data")
	@ApiBody({
		schema: {
			type: "object",
			properties: {
				id: { type: "string", format: "uuid", description: "Application ID" },
				type: { type: "string", enum: Object.values(FileType), description: "File type" },
				file: { type: "string", format: "binary", description: "File to upload (max 3MB)" },
			},
			required: ["id", "type", "file"],
		},
	})
	@ApiResponse({
		status: 201,
		description: "Successfully uploaded the file",
		type: ApplicationFileUploadResponseDto,
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	uploadApplicationFile(
		@Session() session: UserSession,
		@Body() applicationFileDto: ApplicationFileDto,
		@UploadedFile(
			new ParseFilePipe({
				validators: [new MaxFileSizeValidator({ maxSize: 3 * 1024 * 1024 })],
			}),
		)
		file: Express.Multer.File,
	) {
		return this.applicationFileService.uploadApplicationFile(session.user.id, applicationFileDto, file);
	}

	@Get("/:id/:type")
	@ApiOperation({
		description: "Retrieve files for a specific application filtered by file type",
	})
	@ApiParam({
		name: "id",
		description: "The application ID (UUID)",
		example: "550e8400-e29b-41d4-a716-446655440000",
	})
	@ApiParam({
		name: "type",
		description: "The file type",
		enum: FileType,
		example: "file_face",
	})
	@ApiResponse({
		status: 200,
		description: "Successfully retrieved files by type",
		type: [ApplicationFileByTypeResponseDto],
	})
	@ApiResponse({
		status: 404,
		description: "No files found for this type",
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	getApplicationFileByType(@Session() session: UserSession, @Param("id") appId: string, @Param("type") fileType: FileType) {
		return this.applicationFileService.getApplicationFileByType(session.user.id, appId, fileType);
	}
}
