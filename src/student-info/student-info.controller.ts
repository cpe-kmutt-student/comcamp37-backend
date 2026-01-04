import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { StudentInfoDto } from "./dto/student-info.dto";
import { StudentInfoService } from "./student-info.service";
import { StudentAuthGuard } from "src/student-auth/student-auth.guard";
import type { Request } from "express";
import { StudentUserId } from "src/types/Student.type";

@Controller("student/info")
export class StudentInfoController {
	constructor(private readonly studentInfoService: StudentInfoService) {}

	@Post("/update")
	@UseGuards(StudentAuthGuard)
	updateStudentInfo(@Body() studentInfoDto: StudentInfoDto, @Req() req: Request) {
		return this.studentInfoService.updateStudentInfo(studentInfoDto, req.user as StudentUserId);
	}
}
