import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { StudentGoogleGuard } from "./student-google.guard";
import type { Request, Response } from "express";

@Controller("student/auth")
export class StudentGoogleController {
	@Get("/")
	@UseGuards(StudentGoogleGuard)
	async redirectGoogleAuth(@Req() _req: Request, @Res() res: Response) {}

	@Get("/callback")
	@UseGuards(StudentGoogleGuard)
	async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
		return res.json(req.user);
	}
}
