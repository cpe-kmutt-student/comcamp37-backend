import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AcademicGuard } from "src/common/guards/academic.guard";
import { StaffAcademicChaosQuestionService } from "./staff-academic-chaos-question.service";

@Controller("/api/staff/academic-chaos/question")
export class StaffAcademicChaosQuestionController {
	constructor(private readonly staffAcademicChaosQuestionService: StaffAcademicChaosQuestionService) {}

	@Get("/")
	@UseGuards(AcademicGuard)
	getAllRegisAnswer() {
		return this.staffAcademicChaosQuestionService.getAllAcademicChaosAnswer();
	}

	@Get("/:id")
	@UseGuards(AcademicGuard)
	getRegisAnswerByAppId(@Param("id") appId: string) {
		return this.staffAcademicChaosQuestionService.getAcademicChaosAnswerByAppId(appId);
	}
}
