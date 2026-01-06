import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { StudentInfoDto } from "./dto/student-info.dto";
import { StudentInfoService } from "./student-info.service";
import type { Request } from "express";
import { Session } from "@thallesp/nestjs-better-auth";
import type { UserSession } from "@thallesp/nestjs-better-auth";

@Controller("student/info")
export class StudentInfoController {
	constructor(private readonly studentInfoService: StudentInfoService) {}

	@Post("/update")
	updateStudentInfo(@Session() session: UserSession, @Body() studentInfoDto: StudentInfoDto, @Req() req: Request) {
		return this.studentInfoService.updateStudentInfo(studentInfoDto, session);
	}
}
