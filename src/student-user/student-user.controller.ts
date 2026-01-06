import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { StudentUserService } from "./student-user.service";
import type { Request, Response } from "express";
import { StudentUserId } from "src/types/Student.type";

@Controller("student/user")
export class StudentUserController {
	constructor(private readonly StudentUserService: StudentUserService) {}

	@Post("/me")
	// @UseGuards(StudentAuthGuard)
	getMe(@Req() req: Request) {
		const user = req.user as StudentUserId;
		return this.StudentUserService.getMe(user);
	}

	@Post("/info")
	// @UseGuards(StudentAuthGuard)
	getDetails(@Req() req: Request) {
		const user = req.user as StudentUserId;
		return this.StudentUserService.getDetails(user);
	}

	@Post("/status")
	// @UseGuards(StudentAuthGuard)
	getStatus(@Req() req: Request) {
		const user = req.user as StudentUserId;
		return this.StudentUserService.getStatus(user);
	}

	@Post("/questions")
	// @UseGuards(StudentAuthGuard)
	getQuestion(@Req() req: Request) {
		const user = req.user as StudentUserId;
		return this.StudentUserService.getQuestions(user);
	}

	@Post("/files")
	// @UseGuards(StudentAuthGuard)
	getFiles(@Req() req: Request) {
		const user = req.user as StudentUserId;
		return this.StudentUserService.getFiles(user);
	}
}
