import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { ApplicationSubmittedGuard } from "src/common/guards/application-submitted.guard";
import { RegisterPeriodGuard } from "src/common/guards/register-period.guard";
import { StatusUpdaterDto } from "./dto/status-updater.dto";
import { StatusUpdaterAllResponseDto, StatusUpdaterResponseDto } from "./dto/status-updater-response.dto";
import { StatusUpdaterService } from "./status-updater.service";

@ApiTags("Status Updater")
@Controller("/api/application/status/updater")
export class StatusUpdaterController {
	constructor(private readonly statusUpdaterService: StatusUpdaterService) {}

	@Post("/all")
	@UseGuards(RegisterPeriodGuard)
	@UseGuards(ApplicationSubmittedGuard)
	@ApiOperation({
		description: "Update all application statuses for the current user based on completion criteria",
	})
	@ApiResponse({
		status: 200,
		description: "Successfully updated all application statuses",
		type: [StatusUpdaterAllResponseDto],
	})
	@ApiResponse({
		status: 401,
		description: "Unauthorized - User not logged in",
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	updateAll(@Session() session: UserSession) {
		return this.statusUpdaterService.updateAllApplicationStatus(session.user.id);
	}

	@Post("/file")
	@UseGuards(RegisterPeriodGuard)
	@UseGuards(ApplicationSubmittedGuard)
	@ApiOperation({
		description: "Update file completion status for an application (checks required file types)",
	})
	@ApiBody({
		type: StatusUpdaterDto,
		description: "Application ID to update file status",
	})
	@ApiResponse({
		status: 200,
		description: "Successfully updated file status",
		type: StatusUpdaterResponseDto,
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	fileStatus(@Body() statusUpdaterDto: StatusUpdaterDto) {
		return this.statusUpdaterService.fileDoneUpdater(statusUpdaterDto.application_id);
	}

	@Post("/info")
	@UseGuards(RegisterPeriodGuard)
	@UseGuards(ApplicationSubmittedGuard)
	@ApiOperation({
		description: "Update info completion status for an application (checks all required fields)",
	})
	@ApiBody({
		type: StatusUpdaterDto,
		description: "Application ID to update info status",
	})
	@ApiResponse({
		status: 200,
		description: "Successfully updated info status",
		type: StatusUpdaterResponseDto,
	})
	@ApiResponse({
		status: 404,
		description: "Info not complete - missing required fields",
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	infoStatus(@Body() statusUpdaterDto: StatusUpdaterDto) {
		return this.statusUpdaterService.infoDoneUpdater(statusUpdaterDto.application_id);
	}

	@Post("/regis-question")
	@UseGuards(RegisterPeriodGuard)
	@UseGuards(ApplicationSubmittedGuard)
	@ApiOperation({
		description: "Update registration question completion status (checks all 6 sections answered)",
	})
	@ApiBody({
		type: StatusUpdaterDto,
		description: "Application ID to update registration question status",
	})
	@ApiResponse({
		status: 200,
		description: "Successfully updated registration question status",
		type: StatusUpdaterResponseDto,
	})
	@ApiResponse({
		status: 404,
		description: "Not all sections answered",
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	regisQuestionStatus(@Body() statusUpdaterDto: StatusUpdaterDto) {
		return this.statusUpdaterService.regisQuestionDoneUpdater(statusUpdaterDto.application_id);
	}

	@Post("/academic-question")
	@UseGuards(RegisterPeriodGuard)
	@UseGuards(ApplicationSubmittedGuard)
	@ApiOperation({
		description: "Update academic question completion status (checks all 6 sections answered)",
	})
	@ApiBody({
		type: StatusUpdaterDto,
		description: "Application ID to update academic question status",
	})
	@ApiResponse({
		status: 200,
		description: "Successfully updated academic question status",
		type: StatusUpdaterResponseDto,
	})
	@ApiResponse({
		status: 404,
		description: "Not all sections answered",
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	academicQuestionStatus(@Body() statusUpdaterDto: StatusUpdaterDto) {
		return this.statusUpdaterService.academicQuestionDoneUpdater(statusUpdaterDto.application_id);
	}

	@Post("/payment")
	@UseGuards(RegisterPeriodGuard)
	@UseGuards(ApplicationSubmittedGuard)
	@ApiOperation({
		description: "Update payment completion status (checks payment slip uploaded)",
	})
	@ApiBody({
		type: StatusUpdaterDto,
		description: "Application ID to update payment status",
	})
	@ApiResponse({
		status: 200,
		description: "Successfully updated payment status",
		type: StatusUpdaterResponseDto,
	})
	@ApiResponse({
		status: 404,
		description: "Payment slip not found",
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	paymentStatus(@Body() statusUpdaterDto: StatusUpdaterDto) {
		return this.statusUpdaterService.paymentDoneUpdater(statusUpdaterDto.application_id);
	}
}
