import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { RegisterPeriodGuard } from "src/common/guards/register-period.guard";
import { ApplicationSubmitService } from "./application-submit.service";
import { ApplicationSubmitDto } from "./dto/application-submit.dto";

@Controller("/api/application/submit")
export class ApplicationSubmitController {
	constructor(private readonly applicationSubmitService: ApplicationSubmitService) {}

	@Post("/")
	@UseGuards(RegisterPeriodGuard)
	applicationSubmit(@Session() session: UserSession, @Body() applicationSubmitDto: ApplicationSubmitDto) {
		return this.applicationSubmitService.applicationSubmit(session.user.id, applicationSubmitDto);
	}
}
