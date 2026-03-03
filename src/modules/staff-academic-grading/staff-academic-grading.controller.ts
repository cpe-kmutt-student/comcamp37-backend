import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { AcademicGuard } from "src/common/guards/academic.guard";
import { StaffAcademicGradingDto } from "./dto/staff-academic-grading.dto";
import { StaffAcademicGradingService } from "./staff-academic-grading.service";

@Controller("/api/staff/academic/answer")
export class StaffAcademicGradingController {
	constructor(private readonly staffAcademicGradingService: StaffAcademicGradingService) {}

	@Get("/")
	@UseGuards(AcademicGuard)
	getAll() {
		return this.staffAcademicGradingService.getAll();
	}

	@Get("/:id")
	@UseGuards(AcademicGuard)
	getAnswerByAppId(@Param("id") appId: string) {
		return this.staffAcademicGradingService.getAnswerByAppId(appId);
	}

	@Post("/grading")
	@UseGuards(AcademicGuard)
	answerGrading(@Session() session: UserSession, @Body() staffAcademicGradingDto: StaffAcademicGradingDto) {
		return this.staffAcademicGradingService.answerGrading(session.user.id, staffAcademicGradingDto);
	}
}
