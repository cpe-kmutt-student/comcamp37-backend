import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { AcademicGuard } from "src/common/guards/academic.guard";
import { StaffAcademicChaosGradingDto } from "./dto/staff-academic-chaos-grading.dto";
import { StaffAcademicChaosGradingService } from "./staff-academic-chaos-grading.service";

@Controller("/api/staff/academic-chaos/answer")
export class StaffAcademicChaosGradingController {
	constructor(private readonly staffAcademicChaosGradingService: StaffAcademicChaosGradingService) {}

	@Get("/")
	@UseGuards(AcademicGuard)
	getAll() {
		return this.staffAcademicChaosGradingService.getAll();
	}

	@Get("/:id")
	@UseGuards(AcademicGuard)
	getAnswerByAppId(@Param("id") appId: string) {
		return this.staffAcademicChaosGradingService.getAnswerByAppId(appId);
	}

	@Post("/grading")
	@UseGuards(AcademicGuard)
	answerGrading(@Session() session: UserSession, @Body() staffAcademicGradingDto: StaffAcademicChaosGradingDto) {
		return this.staffAcademicChaosGradingService.answerGrading(session.user.id, staffAcademicGradingDto);
	}
}
