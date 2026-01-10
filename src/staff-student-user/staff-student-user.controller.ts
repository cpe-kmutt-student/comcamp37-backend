import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import type { UserSession } from "@thallesp/nestjs-better-auth";
import { Session } from "@thallesp/nestjs-better-auth";
import { StaffGuard } from "src/staff/staff.guard";
import { StaffStudentGetByIdDto, StaffStudentInfoEditDto } from "./dto/staff-student-user.dto";
import { StaffStudentUserService } from "./staff-student-user.service";

@Controller("/api/staff/student/user")
export class StaffStudentUserController {
	constructor(private readonly staffStudentUserService: StaffStudentUserService) {}

	@Get("/")
	@UseGuards(StaffGuard)
	getStudentAll() {
		return this.staffStudentUserService.getStudentAll();
	}

	@Get("/:id")
	@UseGuards(StaffGuard)
	getStudentById(@Param() staffStudentGetByIdDto: StaffStudentGetByIdDto) {
		return this.staffStudentUserService.getStudentById(staffStudentGetByIdDto.id);
	}

	@Post("/info/edit")
	@UseGuards(StaffGuard)
	studentInfoEdit(@Body() staffStudentInfoEditDto: StaffStudentInfoEditDto) {
		return this.staffStudentUserService.studentInfoEdit(staffStudentInfoEditDto);
	}
}
