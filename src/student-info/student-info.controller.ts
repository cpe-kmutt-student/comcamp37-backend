import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import type { UserSession } from "@thallesp/nestjs-better-auth";
import { Session } from "@thallesp/nestjs-better-auth";
import type { Request } from "express";
import { StudentInfoDto } from "./dto/student-info.dto";
import { StudentInfoService } from "./student-info.service";

@Controller("/api/student/info")
export class StudentInfoController {
	constructor(private readonly studentInfoService: StudentInfoService) {}

	@Get("/history")
	getFilledHistory(@Session() session: UserSession) {
		return this.studentInfoService.getFilledHistory(session.user.id);
	}

	@Post("/update")
	updateStudentInfo(@Session() session: UserSession, @Body() studentInfoDto: StudentInfoDto) {
		return this.studentInfoService.updateStudentInfo(session.user.id, studentInfoDto);
	}

	// @Post("/status")
	// updateStudentInfo(@Session() session: UserSession, @Body() studentInfoDto: StudentInfoDto, @Req() req: Request) {
	// 	return this.studentInfoService.updateStudentInfo(studentInfoDto, session.user.id);
	// }
}
