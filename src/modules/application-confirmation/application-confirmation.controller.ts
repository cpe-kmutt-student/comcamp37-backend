import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { AnnounceAndConfirmPeriodGuard } from "src/common/guards/announce-period.guard";
import { RegisterPeriodGuard } from "src/common/guards/register-period.guard";
import { ApplicationConfirmationService } from "./application-confirmation.service";
import { ApplicationConfirmationDto } from "./dto/application-confirmation.dto";
import { ApplicationConfirmationResponseDto } from "./dto/application-confirmation-response.dto";

@ApiTags("Application Confirmation")
@Controller("/api/application/confirmation")
export class ApplicationConfirmationController {
	constructor(private readonly applicationConfirmation: ApplicationConfirmationService) {}

	@Get("/")
	@ApiOperation({
		description: "Retrieve all confirmation statuses for the authenticated user",
	})
	@ApiResponse({
		status: 200,
		description: "Successfully retrieved all confirmation statuses",
		type: [ApplicationConfirmationResponseDto],
	})
	@ApiResponse({
		status: 404,
		description: "No applications found for this user",
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	getConfirmationAll(@Session() session: UserSession) {
		return this.applicationConfirmation.getApplicationConfirmation(session.user.id);
	}

	@Get("/:id")
	@ApiOperation({
		description: "Retrieve confirmation status for a specific application",
	})
	@ApiParam({
		name: "id",
		description: "The application ID (UUID)",
		example: "550e8400-e29b-41d4-a716-446655440000",
	})
	@ApiResponse({
		status: 200,
		description: "Successfully retrieved the confirmation status",
		type: ApplicationConfirmationResponseDto,
	})
	@ApiResponse({
		status: 404,
		description: "Application not found",
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	getConfirmation(@Session() session: UserSession, @Param("id") appId: string) {
		return this.applicationConfirmation.getApplicationConfirmation(session.user.id, appId);
	}

	@Post("/")
	@UseGuards(AnnounceAndConfirmPeriodGuard)
	@ApiOperation({
		description: "Confirm or decline an application. Requires application to be passed and allowed to confirm.",
	})
	@ApiBody({
		type: ApplicationConfirmationDto,
	})
	@ApiResponse({
		status: 201,
		description: "Successfully updated confirmation status",
		type: ApplicationConfirmationResponseDto,
	})
	@ApiResponse({
		status: 403,
		description: "Forbidden - Application not eligible for confirmation",
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	isConfirmApplication(@Session() session: UserSession, @Body() applicationConfirmationDto: ApplicationConfirmationDto) {
		return this.applicationConfirmation.isConfirmApplication(session.user.id, applicationConfirmationDto);
	}
}
