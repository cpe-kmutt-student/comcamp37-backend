import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { StudentUserService } from "./student-user.service";
import type { Request, Response } from "express";
import { Session } from "@thallesp/nestjs-better-auth";
import type { UserSession } from "@thallesp/nestjs-better-auth";

@Controller("student/user")
export class StudentUserController {
	constructor(private readonly StudentUserService: StudentUserService) {}

	@Post("/me")
	getMe(@Session() session: UserSession, @Req() req: Request) {
		return this.StudentUserService.getMe(session.user.id);
	}

	@Post("/info")
	getDetails(@Session() session: UserSession, @Req() req: Request) {
		return this.StudentUserService.getDetails(session.user.id);
	}

	@Post("/status")
	getStatus(@Session() session: UserSession, @Req() req: Request) {
		return this.StudentUserService.getStatus(session.user.id);
	}

	@Post("/questions")
	getQuestion(@Session() session: UserSession, @Req() req: Request) {
		return this.StudentUserService.getQuestions(session.user.id);
	}

	@Post("/files")
	getFiles(@Session() session: UserSession, @Req() req: Request) {
		return this.StudentUserService.getFiles(session.user.id);
	}
}
