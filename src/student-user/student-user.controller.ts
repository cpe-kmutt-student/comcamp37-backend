import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import type { UserSession } from "@thallesp/nestjs-better-auth";
import { Session } from "@thallesp/nestjs-better-auth";
import type { Request, Response } from "express";
import { StudentUserService } from "./student-user.service";

@Controller("/api/student/user")
export class StudentUserController {
	constructor(private readonly StudentUserService: StudentUserService) {}

	@Get("/me")
	getMe(@Session() session: UserSession) {
		return this.StudentUserService.getMe(session.user.id);
	}

	@Get("/info")
	getDetails(@Session() session: UserSession) {
		return this.StudentUserService.getInfo(session.user.id);
	}

	@Get("/status")
	getStatus(@Session() session: UserSession) {
		return this.StudentUserService.getStatus(session.user.id);
	}

	@Get("/questions")
	getQuestion(@Session() session: UserSession) {
		return this.StudentUserService.getQuestions(session.user.id);
	}

	@Get("/files")
	getFiles(@Session() session: UserSession) {
		return this.StudentUserService.getFiles(session.user.id);
	}
}
