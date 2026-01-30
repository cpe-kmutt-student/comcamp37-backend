import { Body, Controller, Param, Post } from "@nestjs/common";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { StatusUpdaterDto } from "./dto/status-updater.dto";
import { StatusUpdaterService } from "./status-updater.service";

@Controller("/api/application/status/updater")
export class StatusUpdaterController {
	constructor(private readonly statusUpdaterService: StatusUpdaterService) {}

	@Post("/all")
	updateAll(@Session() session: UserSession) {
		return this.statusUpdaterService.updateAllApplicationStatus(session.user.id);
	}

	@Post("/file")
	fileStatus(@Body() statusUpdaterDto: StatusUpdaterDto) {
		return this.statusUpdaterService.fileDoneUpdater(statusUpdaterDto.application_id);
	}

	@Post("/info")
	infoStatus(@Body() statusUpdaterDto: StatusUpdaterDto) {
		return this.statusUpdaterService.infoDoneUpdater(statusUpdaterDto.application_id);
	}

	@Post("/regis-question")
	regisQuestionStatus(@Body() statusUpdaterDto: StatusUpdaterDto) {
		return this.statusUpdaterService.regisQuestionDoneUpdater(statusUpdaterDto.application_id);
	}

	@Post("/academic-question")
	academicQuestionStatus(@Body() statusUpdaterDto: StatusUpdaterDto) {
		return this.statusUpdaterService.academicQuestionDoneUpdater(statusUpdaterDto.application_id);
	}

	@Post("/payment")
	paymentStatus(@Body() statusUpdaterDto: StatusUpdaterDto) {
		return this.statusUpdaterService.paymentDoneUpdater(statusUpdaterDto.application_id);
	}
}
