import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { ApplicationInfoService } from "./application-info.service";
import { ApplicationInfoDto } from "./dto/application-info.dto";
import { ApplicationInfoResponseDto, ApplicationInfoUpdateResponseDto } from "./dto/application-info-response.dto";

@ApiTags("Application Info")
@Controller("/api/application/info")
export class ApplicationInfoController {
	constructor(private readonly applicationInfoService: ApplicationInfoService) {}

	@Get("/:id")
	@ApiOperation({
		description: "Retrieve personal information for a specific application",
	})
	@ApiParam({
		name: "id",
		description: "The application ID (UUID)",
		example: "550e8400-e29b-41d4-a716-446655440000",
	})
	@ApiResponse({
		status: 200,
		description: "Successfully retrieved application info",
		type: ApplicationInfoResponseDto,
	})
	@ApiResponse({
		status: 404,
		description: "Application info not found",
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	getInfo(@Session() session: UserSession, @Param("id") appId: string) {
		return this.applicationInfoService.getApplicationInfo(session.user.id, appId);
	}

	@Post("/:id")
	@ApiOperation({
		description: "Update personal information for a specific application",
	})
	@ApiParam({
		name: "id",
		description: "The application ID (UUID)",
		example: "550e8400-e29b-41d4-a716-446655440000",
	})
	@ApiBody({
		type: ApplicationInfoDto,
	})
	@ApiResponse({
		status: 201,
		description: "Successfully updated application info",
		type: ApplicationInfoUpdateResponseDto,
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	updateInfoHistory(@Session() session: UserSession, @Param("id") appId: string, @Body() applicationInfoDto: ApplicationInfoDto) {
		return this.applicationInfoService.updateApplicationInfo(session.user.id, appId, applicationInfoDto);
	}
}
