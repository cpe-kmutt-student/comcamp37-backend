import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { ApplicationConfirmationService } from "./application-confirmation.service";
import { ApplicationConfirmationDto } from "./dto/application-confirmation.dto";

@Controller("/api/application/confirmation")
export class ApplicationConfirmationController {
	constructor(private readonly applicationConfirmation: ApplicationConfirmationService) {}

	@Get("/")
	getConfirmationAll(@Session() session: UserSession) {
		return this.applicationConfirmation.getApplicationConfirmation(session.user.id);
	}

	@Get("/:id")
	getConfirmation(@Session() session: UserSession, @Param("id") appId: string) {
		return this.applicationConfirmation.getApplicationConfirmation(session.user.id, appId);
	}

	@Post("/")
	isConfirmApplication(@Session() session: UserSession, @Body() applicationConfirmationDto: ApplicationConfirmationDto) {
		return this.applicationConfirmation.isConfirmApplication(session.user.id, applicationConfirmationDto);
	}
}
