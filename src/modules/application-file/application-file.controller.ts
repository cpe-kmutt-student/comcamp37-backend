import { Body, Controller, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { FileType } from "generated/prisma/enums";
import { ApplicationFileService } from "./application-file.service";
import { ApplicationFileDto } from "./dto/application-file.dto";

@Controller("/api/application/file")
export class ApplicationFileController {
	constructor(private readonly applicationFileService: ApplicationFileService) {}

	@Get("/:id")
	getApplicationFiles(@Session() session: UserSession, @Param("id") appId: string) {
		return this.applicationFileService.getApplicationFiles(session.user.id, appId);
	}

	@Post("/upload")
	@UseInterceptors(FileInterceptor("file"))
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
	getApplicationFileByType(@Session() session: UserSession, @Param("id") appId: string, @Param("type") fileType: FileType) {
		return this.applicationFileService.getApplicationFileByType(session.user.id, appId, fileType);
	}
}
