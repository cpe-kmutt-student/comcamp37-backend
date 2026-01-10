import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import type { UserSession } from "@thallesp/nestjs-better-auth";
import { Session } from "@thallesp/nestjs-better-auth";
import { StudentAnswerDto } from "./dto/student-answer.dto";
import { StudentQuestionService } from "./student-question.service";

@Controller("/api/student/question")
export class StudentQuestionController {
	constructor(private readonly studentQuestionService: StudentQuestionService) {}

	@Post("/answer")
	answerQuesion(@Session() session: UserSession, @Body() studentAnswerDto: StudentAnswerDto) {
		return this.studentQuestionService.answerQuestion(session.user.id, studentAnswerDto.section, studentAnswerDto.answer);
	}
}
