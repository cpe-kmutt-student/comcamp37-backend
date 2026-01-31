import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { RegisGuard } from "src/common/guards/regis.guard";
import { AppStatusCommentDto, AppStatusInfoCheckDto } from "./dto/staff-status.dto";
import { StaffInfoCheckResponseDto, StaffStatusResponseDto } from "./dto/staff-status-response.dto";
import { StaffStatusService } from "./staff-status.service";

@ApiTags("Staff Status")
@Controller("/api/staff/status")
export class StaffStatusController {
	constructor(private readonly staffStatusService: StaffStatusService) {}

	@Get("/:id")
	@UseGuards(RegisGuard)
	@ApiOperation({
		description: "Retrieve application status by application ID (Staff/Regis only)",
	})
	@ApiParam({
		name: "id",
		description: "The application ID (UUID)",
		example: "550e8400-e29b-41d4-a716-446655440000",
	})
	@ApiResponse({
		status: 200,
		description: "Successfully retrieved application status",
		type: StaffStatusResponseDto,
	})
	@ApiResponse({
		status: 403,
		description: "Forbidden - Staff access required",
	})
	@ApiResponse({
		status: 404,
		description: "Application status not found",
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	getStatus(@Param("id") appId: string) {
		return this.staffStatusService.getStatusById(appId);
	}

	@Post("/info/check")
	@UseGuards(RegisGuard)
	@ApiOperation({
		description: "Update or create application info check status (Staff/Regis only)",
	})
	@ApiBody({
		type: AppStatusInfoCheckDto,
		description: "Application info check data",
	})
	@ApiResponse({
		status: 200,
		description: "Successfully updated info check status",
		type: StaffInfoCheckResponseDto,
	})
	@ApiResponse({
		status: 201,
		description: "Successfully created info check status",
		type: StaffInfoCheckResponseDto,
	})
	@ApiResponse({
		status: 403,
		description: "Forbidden - Staff access required",
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	infoCheckStatus(@Session() session: UserSession, @Body() appStatusInfoCheckDto: AppStatusInfoCheckDto) {
		return this.staffStatusService.appInfoCheck(session.user.id, appStatusInfoCheckDto);
	}

	@Post("/info/comment")
	@UseGuards(RegisGuard)
	@ApiOperation({
		description: "Add comment to application info (Staff/Regis only)",
	})
	@ApiBody({
		type: AppStatusCommentDto,
		description: "Application comment data",
	})
	@ApiResponse({
		status: 200,
		description: "Successfully added comment",
		type: StaffStatusResponseDto,
	})
	@ApiResponse({
		status: 403,
		description: "Forbidden - Staff access required",
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	infoComment(@Body() appStatusInfoCommentDto: AppStatusCommentDto) {
		return;
	}
}
