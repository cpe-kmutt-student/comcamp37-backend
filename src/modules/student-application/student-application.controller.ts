import { Controller, Get, Param, Post, Session, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import type { UserSession } from "@thallesp/nestjs-better-auth";
import { ApplicationCreatedGuard } from "src/common/guards/application-created.guard";
import { RegisterPeriodGuard } from "src/common/guards/register-period.guard";
import { StudentApplicationResponseDto } from "./dto";
import { StudentApplicationService } from "./student-application.service";

@ApiTags("Student Application")
@Controller("api/student/application")
export class StudentApplicationController {
	constructor(private readonly studentApplicationService: StudentApplicationService) {}

	@Get("/")
	@ApiOperation({
		description: "Retrieve all applications for the authenticated student user",
	})
	@ApiResponse({
		status: 200,
		description: "Successfully retrieved all applications",
		type: [StudentApplicationResponseDto],
	})
	@ApiResponse({
		status: 404,
		description: "No applications found for this user",
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	getApplications(@Session() session: UserSession) {
		return this.studentApplicationService.getApplications(session.user.id);
	}

	@Post("/create")
	@UseGuards(RegisterPeriodGuard)
	@UseGuards(ApplicationCreatedGuard)
	@ApiOperation({
		description: "Create a new student application for the authenticated user. This will also initialize ApplicationInfo and ApplicationStatus records.",
	})
	@ApiResponse({
		status: 201,
		description: "Successfully created a new application",
		type: StudentApplicationResponseDto,
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	createApplication(@Session() session: UserSession) {
		return this.studentApplicationService.createApplication(session.user.id);
	}

	@Get("/:id")
	@ApiOperation({
		description: "Retrieve a specific application by its ID for the authenticated student user",
	})
	@ApiParam({
		name: "id",
		description: "The application ID (UUID)",
		example: "550e8400-e29b-41d4-a716-446655440000",
	})
	@ApiResponse({
		status: 200,
		description: "Successfully retrieved the application",
		type: StudentApplicationResponseDto,
	})
	@ApiResponse({
		status: 404,
		description: "Application not found",
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	findApplication(@Session() session: UserSession, @Param("id") appId: string) {
		return this.studentApplicationService.findApplication(session.user.id, appId);
	}
}
