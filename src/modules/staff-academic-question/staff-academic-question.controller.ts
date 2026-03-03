import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AcademicGuard } from "src/common/guards/academic.guard";
import { RegisGuard } from "src/common/guards/regis.guard";
import { StaffAcademicQuestionService } from "./staff-academic-question.service";

@Controller("/api/staff/academic/question")
export class StaffAcademicQuestionController {
	constructor(private readonly staffAcademicQuestionService: StaffAcademicQuestionService) {}

	@Get("/")
	@UseGuards(AcademicGuard)
	getAllRegisAnswer() {
		return this.staffAcademicQuestionService.getAllAcademicAnswer();
	}

	@Get("/:id")
	@UseGuards(AcademicGuard)
	getRegisAnswerByAppId(@Param("id") appId: string) {
		return this.staffAcademicQuestionService.getAcademicAnswerByAppId(appId);
	}
}
