import { Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { StaffGuard } from "src/staff/staff.guard";
import { StaffStudentQuestionCheckedDto, StaffStudentQuestionGetAnswerDto } from "./dto/staff-student-question.dto";
import { StaffStudentQuestionService } from "./staff-student-question.service";

@Controller("/api/staff/student/question")
export class StaffStudentQuestionController {
	constructor(private readonly staffStudentQuestionService: StaffStudentQuestionService) {}

	@Get("/:stdId")
	@UseGuards(StaffGuard)
	getStudentAnswer(@Param() staffStudentQuestionGetAnswerDto: StaffStudentQuestionGetAnswerDto) {
		return this.staffStudentQuestionService.getStudentAnswer(staffStudentQuestionGetAnswerDto.stdId);
	}

	@Post("/checked")
	@UseGuards(StaffGuard)
	studentQuestionChecked(@Param() staffStudentQuestionCheckedDto: StaffStudentQuestionCheckedDto) {
		return this.staffStudentQuestionService.studentQuestionChecked(staffStudentQuestionCheckedDto);
	}
}
