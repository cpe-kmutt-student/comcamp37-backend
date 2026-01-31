import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { RegisGuard } from "src/common/guards/regis.guard";
import { AppStatusCommentDto, AppStatusInfoCheckDto } from "./dto/staff-status.dto";
import { StaffStatusService } from "./staff-status.service";

@Controller("/api/staff/status")
export class StaffStatusController {
	constructor(private readonly staffStatusService: StaffStatusService) {}

	@Get("/:id")
	@UseGuards(RegisGuard)
	getStatus(@Param("id") appId: string) {
		return this.staffStatusService.getStatusById(appId);
	}

	@Post("/info/check")
	@UseGuards(RegisGuard)
	infoCheckStatus(@Session() session: UserSession, @Body() appStatusInfoCheckDto: AppStatusInfoCheckDto) {
		return this.staffStatusService.appInfoCheck(session.user.id, appStatusInfoCheckDto);
	}

	@Post("/info/comment")
	@UseGuards(RegisGuard)
	infoComment(@Body() appStatusInfoCommentDto: AppStatusCommentDto) {
		return;
	}
}
