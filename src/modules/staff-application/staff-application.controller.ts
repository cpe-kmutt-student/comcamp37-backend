import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { RegisGuard } from "src/common/guards/regis.guard";
import { StaffApplicationNoteDto, StaffCheckApplicationDto } from "./dto/staff-application.dto";
import { StaffApplicationResponseDto } from "./dto/staff-application-response.dto";
import { StaffApplicationService } from "./staff-application.service";

@ApiTags("Staff Application")
@Controller("/api/staff/application")
export class StaffApplicationController {
	constructor(private readonly staffApplicationService: StaffApplicationService) {}

	@Get("/all")
	@UseGuards(RegisGuard)
	@ApiOperation({
		description: "Retrieve all submitted applications with completed info (Staff/Regis only)",
	})
	@ApiResponse({
		status: 200,
		description: "Successfully retrieved all applications",
		type: [StaffApplicationResponseDto],
	})
	@ApiResponse({
		status: 403,
		description: "Forbidden - Staff access required",
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	getAll() {
		return this.staffApplicationService.getAll();
	}

	@Get("/:id")
	@UseGuards(RegisGuard)
	@ApiOperation({
		description: "Retrieve a specific application by ID (Staff/Regis only)",
	})
	@ApiParam({
		name: "id",
		description: "The application ID (UUID)",
		example: "550e8400-e29b-41d4-a716-446655440000",
	})
	@ApiResponse({
		status: 200,
		description: "Successfully retrieved the application",
		type: StaffApplicationResponseDto,
	})
	@ApiResponse({
		status: 403,
		description: "Forbidden - Staff access required",
	})
	@ApiResponse({
		status: 404,
		description: "Application not found",
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	getByAppId(@Param("id") appId: string) {
		return this.staffApplicationService.getByAppId(appId);
	}

	@Post("/check")
	@UseGuards(RegisGuard)
	checkApplication(@Session() session: UserSession, @Body() staffCheckApplicationDto: StaffCheckApplicationDto) {
		return this.staffApplicationService.checkApplication(session.user.id, staffCheckApplicationDto);
	}

	@Post("/note")
	@UseGuards(RegisGuard)
	addApplicationNote(@Body() staffApplicationNoteDto: StaffApplicationNoteDto) {
		return this.staffApplicationService.addApplicationNote(staffApplicationNoteDto);
	}
}
