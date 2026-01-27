import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { ApplicationQuestionService } from "./application-question.service";
import { AnswerQuestionDto } from "./dto/answer-question.dto";

@Controller("/api/application/question")
export class ApplicationQuestionController {
	constructor(private readonly applicationQuestionService: ApplicationQuestionService) {}

	@Get("/regis/answer/history")
	getAnswerHistoryAll(@Session() session: UserSession) {
		return this.applicationQuestionService.getRegisAnswerHistory(session.user.id);
	}

	@Get("/regis/:id/answer/history")
	getAnswerHistory(@Session() session: UserSession, @Param("id") appId: string) {
		return this.applicationQuestionService.getRegisAnswerHistory(session.user.id, appId);
	}

	@Get("/academic/answer/history")
	getAcademicHistoryAll(@Session() session: UserSession) {
		return this.applicationQuestionService.getAcademicAnswerHistory(session.user.id);
	}

	@Get("/academic/:id/answer/history")
	getAcademicHistory(@Session() session: UserSession, @Param("id") appId: string) {
		return this.applicationQuestionService.getAcademicAnswerHistory(session.user.id, appId);
	}

	@Post("/regis/answer")
	answerRegis(@Session() session: UserSession, @Body() answerQuestionDto: AnswerQuestionDto) {
		return this.applicationQuestionService.answerRegis(session.user.id, answerQuestionDto);
	}

	@Post("/academic/answer")
	answerAcademic(@Session() session: UserSession, @Body() answerQuestionDto: AnswerQuestionDto) {
		return this.applicationQuestionService.answerAcademic(session.user.id, answerQuestionDto);
	}
}
