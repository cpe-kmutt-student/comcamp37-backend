import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { RegisGuard } from "src/common/guards/regis.guard";
import { StaffRegisQuestionService } from "./staff-regis-question.service";

@Controller("/api/staff/question/regis")
export class StaffRegisQuestionController {
	constructor(private readonly staffRegisQuestionService: StaffRegisQuestionService) {}

	@Get("/")
	@UseGuards(RegisGuard)
	getAllRegisAnswer() {
		return this.staffRegisQuestionService.getAllRegisAnswer();
	}

	@Get("/:id")
	@UseGuards(RegisGuard)
	getRegisAnswerByAppId(@Param("id") appId: string) {
		return this.staffRegisQuestionService.getRegisAnswerByAppId(appId);
	}
}
