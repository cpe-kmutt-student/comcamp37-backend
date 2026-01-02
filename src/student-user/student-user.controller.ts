import { Controller, Get, Post, Res } from "@nestjs/common";
import { StudentUserService } from "./student-user.service";
import type { Response } from "express";

@Controller("student/user")
export class StudentUserController {
	constructor(private readonly StudentUserService: StudentUserService) {}

	@Post("/profile")
	getProfile(@Res() res: Response) {
		// return this.StudentUserService.getStudentProfile();
		res.cookie('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30", {
			path: '/',
			expires: new Date('2027-01-02T02:31:55Z'),
			httpOnly: true,
		})
		return res.json({
			status: "SUCCESS"
		})
	}
}
