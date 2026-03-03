import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { LoggerService } from "src/core/logger/logger.service";
import { PrismaService } from "src/core/prisma/prisma.service";
import { StaffAcademicGradingDto } from "./dto/staff-academic-grading.dto";

@Injectable()
export class StaffAcademicGradingService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly logger: LoggerService,
		// private readonly staffStatusUpdaterService: StaffStatusUpdaterService,
	) {}

	async getAll() {
		try {
			const allAnswers = await this.prisma.studentApplication.findMany({
				where: {
					std_application_submit: true,
				},
				include: {
					std_status: true,
					std_academic_question: {
						include: {
							stf_academic_question_score: {
								include: {
									stf_user: true,
								},
							},
						},
					},
				},
			});

			if (!allAnswers) {
				throw new NotFoundException();
			}

			return allAnswers;
		} catch (e) {
			this.logger.error(e);
			throw new InternalServerErrorException(e);
		}
	}

	async getAnswerByAppId(appId: string) {
		try {
			const allAnswers = await this.prisma.applicationAcademicQuestionAnswer.findMany({
				where: {
					std_application_id: appId,
				},
				include: {
					stf_academic_question_score: {
						include: {
							stf_user: true,
						},
					},
				},
			});

			if (!allAnswers) {
				throw new NotFoundException();
			}

			return allAnswers;
		} catch (e) {
			this.logger.error(e);
			throw new InternalServerErrorException(e);
		}
	}

	async answerGrading(userId: string, staffAcademicGradingDto: StaffAcademicGradingDto) {
		try {
			// Delete existing score by the same staff before creating a new one
			await this.prisma.applicationAcademicQuestionScore.deleteMany({
				where: {
					std_academic_answer: {
						std_application_id: staffAcademicGradingDto.application_id,
					},
					std_academic_answer_id: staffAcademicGradingDto.answer_id,
					stf_count: 1,
				},
			});

			const createScore = await this.prisma.applicationAcademicQuestionScore.create({
				data: {
					std_academic_answer_id: staffAcademicGradingDto.answer_id,
					stf_count: 1,
					stf_score: staffAcademicGradingDto.score,
					stf_user_id: userId,
				},
			});

			const answerScore = await this.prisma.applicationAcademicQuestionScore.findMany({
				where: {
					std_academic_answer: {
						std_application_id: staffAcademicGradingDto.application_id,
					},
					std_academic_answer_id: staffAcademicGradingDto.answer_id,
				},
				include: {
					stf_user: true,
				},
			});

			// await this.staffStatusUpdaterService.updateRegisQuestionCheckedStatus(staffRegisGradingDto.application_id);
			return answerScore;
		} catch (e) {
			this.logger.error(e);
			throw new InternalServerErrorException(e);
		}
	}
}
