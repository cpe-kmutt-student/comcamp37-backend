import { Controller, Get, Param, Post } from "@nestjs/common";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { ApplicationStatusService } from "./application-status.service";

@Controller("/api/application/status")
export class ApplicationStatusController {
	constructor(private readonly applicationStatusService: ApplicationStatusService) {}

	@Get("/")
	getAllApplicationStatus(@Session() session: UserSession) {
		return this.applicationStatusService.getAllApplicationStatus(session.user.id);
	}

	@Get("/:id")
	findApplicationStatus(@Session() session: UserSession, @Param("id") appId: string) {
		return this.applicationStatusService.findApplicationStatus(session.user.id, appId);
	}
}
