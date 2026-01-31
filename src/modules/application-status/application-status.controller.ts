import { Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { ApplicationStatusService } from "./application-status.service";
import { ApplicationStatusResponseDto } from "./dto/application-status-response.dto";

@ApiTags("Application Status")
@Controller("/api/application/status")
export class ApplicationStatusController {
	constructor(private readonly applicationStatusService: ApplicationStatusService) {}

	@Get("/")
	@ApiOperation({
		description: "Retrieve all application statuses for the authenticated user",
	})
	@ApiResponse({
		status: 200,
		description: "Successfully retrieved all application statuses",
		type: [ApplicationStatusResponseDto],
	})
	@ApiResponse({
		status: 404,
		description: "No application statuses found",
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	getAllApplicationStatus(@Session() session: UserSession) {
		return this.applicationStatusService.getAllApplicationStatus(session.user.id);
	}

	@Get("/:id")
	@ApiOperation({
		description: "Retrieve application status for a specific application",
	})
	@ApiParam({
		name: "id",
		description: "The application ID (UUID)",
		example: "550e8400-e29b-41d4-a716-446655440000",
	})
	@ApiResponse({
		status: 200,
		description: "Successfully retrieved application status",
		type: ApplicationStatusResponseDto,
	})
	@ApiResponse({
		status: 404,
		description: "Application status not found",
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	findApplicationStatus(@Session() session: UserSession, @Param("id") appId: string) {
		return this.applicationStatusService.findApplicationStatus(session.user.id, appId);
	}
}
