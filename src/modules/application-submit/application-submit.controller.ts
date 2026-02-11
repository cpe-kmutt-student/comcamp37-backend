import { Body, Controller, Post } from "@nestjs/common";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { ApplicationSubmitService } from "./application-submit.service";
import { ApplicationSubmitDto } from "./dto/application-submit.dto";

@Controller("/api/application/submit")
export class ApplicationSubmitController {
	constructor(private readonly applicationSubmitService: ApplicationSubmitService) {}

	@Post("/")
	applicationSubmit(@Session() session: UserSession, @Body() applicationSubmitDto: ApplicationSubmitDto) {
		return this.applicationSubmitService.applicationSubmit(session.user.id, applicationSubmitDto);
	}
}
