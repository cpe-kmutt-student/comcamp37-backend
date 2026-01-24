import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import type { UserSession } from "@thallesp/nestjs-better-auth";
import { Session } from "@thallesp/nestjs-better-auth";
import type { Request, Response } from "express";
import { StudentUserService } from "./student-user.service";

@Controller("/api/student/user")
export class StudentUserController {
	constructor(private readonly StudentUserService: StudentUserService) {}

	@Get("/")
	getUser(@Session() session: UserSession) {
		return this.StudentUserService.getUser(session.user.id);
	}
}
