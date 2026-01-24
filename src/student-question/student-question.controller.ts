import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import type { UserSession } from "@thallesp/nestjs-better-auth";
import { Session } from "@thallesp/nestjs-better-auth";
import { StudentAnswerBySectionDto, StudentAnswerDto } from "./dto/student-question.dto";
import { StudentQuestionService } from "./student-question.service";

@Controller("/api/student/question")
export class StudentQuestionController {
	constructor(private readonly studentQuestionService: StudentQuestionService) {}

	@Post("/answer")
	answerQuesion(@Session() session: UserSession, @Body() studentAnswerDto: StudentAnswerDto) {
		return this.studentQuestionService.answerQuestion(session.user.id, studentAnswerDto.section, studentAnswerDto.answer);
	}

	@Get("/:section")
	getAnswerBySection(@Session() session: UserSession, @Param() studentAnswerBySectionDto: StudentAnswerBySectionDto) {
		return this.studentQuestionService.getAnswerBySection(session.user.id, studentAnswerBySectionDto.section);
	}

	@Get("/")
	getAll(@Session() session: UserSession) {
		// return this.studentQuestionService.getAll(session.user.id);
	}
}
