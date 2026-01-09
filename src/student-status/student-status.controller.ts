import { Body, Controller, Get, Param } from "@nestjs/common";
import type { UserSession } from "@thallesp/nestjs-better-auth";
import { Session } from "@thallesp/nestjs-better-auth";
import { StudentStatusDto } from "./dto/student-status.dto";
import { StudentStatusService } from "./student-status.service";

@Controller("student/status")
export class StudentStatusController {
	constructor(private readonly studentStatusService: StudentStatusService) {}

	@Get("/")
	getAll(@Session() session: UserSession) {
		return this.studentStatusService.getAllStatus(session.user.id);
	}

	@Get("/:status")
	getByStatus(@Session() session: UserSession, @Param() studentStatusDto: StudentStatusDto) {
		return this.studentStatusService.getStatusByStatus(session.user.id, studentStatusDto.status);
	}
}
