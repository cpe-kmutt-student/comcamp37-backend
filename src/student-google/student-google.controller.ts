import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { StudentGoogleGuard } from "./student-google.guard";
import type { Request, Response } from "express";
import { StudentGoogleService } from "./student-google.service";
import { config } from "src/config/app.config";

@Controller("student/google")
export class StudentGoogleController {
	constructor(private readonly studentGoogleService: StudentGoogleService) {}

	@Get("/")
	@UseGuards(StudentGoogleGuard)
	async redirectGoogleAuth() {}

	@Get("/callback")
	@UseGuards(StudentGoogleGuard)
	async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
		await this.studentGoogleService.createStudentUserNew(req);

		const studentUserToken = await this.studentGoogleService.createStudentUserToken(req);

		res.redirect(`${config.app.frontendUrl}/?t=${studentUserToken}`);
	}
}
