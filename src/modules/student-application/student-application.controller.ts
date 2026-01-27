import { Controller, Get, Param, Post, Session } from "@nestjs/common";
import type { UserSession } from "@thallesp/nestjs-better-auth";
import { StudentApplicationService } from "./student-application.service";

@Controller("api/student/application")
export class StudentApplicationController {
	constructor(private readonly studentApplicationService: StudentApplicationService) {}

	@Get("/")
	getApplications(@Session() session: UserSession) {
		return this.studentApplicationService.getApplications(session.user.id);
	}

	@Post("/create")
	createApplication(@Session() session: UserSession) {
		return this.studentApplicationService.createApplication(session.user.id);
	}

	@Get("/:id")
	findApplication(@Session() session: UserSession, @Param("id") appId: string) {
		return this.studentApplicationService.findApplication(session.user.id, appId);
	}
}
