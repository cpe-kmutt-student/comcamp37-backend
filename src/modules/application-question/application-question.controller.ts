import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { ApplicationQuestionService } from "./application-question.service";
import { AnswerQuestionDto } from "./dto/answer-question.dto";
import { AcademicQuestionAnswerResponseDto, RegisQuestionAnswerResponseDto } from "./dto/application-question-response.dto";

@ApiTags("Application Question")
@Controller("/api/application/question")
export class ApplicationQuestionController {
	constructor(private readonly applicationQuestionService: ApplicationQuestionService) {}

	@Get("/regis/answer/history")
	@ApiOperation({
		description: "Retrieve all registration question answer history for the authenticated user",
	})
	@ApiResponse({
		status: 200,
		description: "Successfully retrieved all registration answer history",
		type: [RegisQuestionAnswerResponseDto],
	})
	@ApiResponse({
		status: 404,
		description: "No registration answers found",
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	getAnswerHistoryAll(@Session() session: UserSession) {
		return this.applicationQuestionService.getRegisAnswerHistory(session.user.id);
	}

	@Get("/regis/:id/answer/history")
	@ApiOperation({
		description: "Retrieve registration question answer history for a specific application",
	})
	@ApiParam({
		name: "id",
		description: "The application ID (UUID)",
		example: "550e8400-e29b-41d4-a716-446655440000",
	})
	@ApiResponse({
		status: 200,
		description: "Successfully retrieved registration answer history",
		type: RegisQuestionAnswerResponseDto,
	})
	@ApiResponse({
		status: 404,
		description: "No registration answers found for this application",
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	getAnswerHistory(@Session() session: UserSession, @Param("id") appId: string) {
		return this.applicationQuestionService.getRegisAnswerHistory(session.user.id, appId);
	}

	@Get("/academic/answer/history")
	@ApiOperation({
		description: "Retrieve all academic question answer history for the authenticated user",
	})
	@ApiResponse({
		status: 200,
		description: "Successfully retrieved all academic answer history",
		type: [AcademicQuestionAnswerResponseDto],
	})
	@ApiResponse({
		status: 404,
		description: "No academic answers found",
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	getAcademicHistoryAll(@Session() session: UserSession) {
		return this.applicationQuestionService.getAcademicAnswerHistory(session.user.id);
	}

	@Get("/academic/:id/answer/history")
	@ApiOperation({
		description: "Retrieve academic question answer history for a specific application",
	})
	@ApiParam({
		name: "id",
		description: "The application ID (UUID)",
		example: "550e8400-e29b-41d4-a716-446655440000",
	})
	@ApiResponse({
		status: 200,
		description: "Successfully retrieved academic answer history",
		type: AcademicQuestionAnswerResponseDto,
	})
	@ApiResponse({
		status: 404,
		description: "No academic answers found for this application",
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	getAcademicHistory(@Session() session: UserSession, @Param("id") appId: string) {
		return this.applicationQuestionService.getAcademicAnswerHistory(session.user.id, appId);
	}

	@Post("/regis/answer")
	@ApiOperation({
		description: "Submit or update registration question answers for an application",
	})
	@ApiBody({
		type: AnswerQuestionDto,
	})
	@ApiResponse({
		status: 201,
		description: "Successfully submitted registration answers",
		type: [RegisQuestionAnswerResponseDto],
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	answerRegis(@Session() session: UserSession, @Body() answerQuestionDto: AnswerQuestionDto) {
		return this.applicationQuestionService.answerRegis(session.user.id, answerQuestionDto);
	}

	@Post("/academic/answer")
	@ApiOperation({
		description: "Submit or update academic question answers for an application",
	})
	@ApiBody({
		type: AnswerQuestionDto,
	})
	@ApiResponse({
		status: 201,
		description: "Successfully submitted academic answers",
		type: [AcademicQuestionAnswerResponseDto],
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	answerAcademic(@Session() session: UserSession, @Body() answerQuestionDto: AnswerQuestionDto) {
		return this.applicationQuestionService.answerAcademic(session.user.id, answerQuestionDto);
	}

	@Get("/academic/chaos/answer/history")
	getAcademicChaosAnswerHistoryAll(@Session() session: UserSession) {
		return this.applicationQuestionService.getAcademicChaosAnswerHistory(session.user.id);
	}

	@Get("/academic/chaos/:id/answer/history")
	getAcademicChaosHistory(@Session() session: UserSession, @Param("id") appId: string) {
		return this.applicationQuestionService.getAcademicChaosAnswerHistory(session.user.id, appId);
	}

	@Post("/academic/chaos/answer")
	answerAcadenicChaos(@Session() session: UserSession, @Body() answerQuestionDto: AnswerQuestionDto) {
		return this.applicationQuestionService.answerAcademicChaos(session.user.id, answerQuestionDto);
	}
}
