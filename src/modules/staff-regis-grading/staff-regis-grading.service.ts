import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { StaffRegisGradingDto } from "./dto/staff-regis-grading.dto";

@Injectable()
export class StaffRegisGradingService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll() {
		try {
			const allAnswers = await this.prisma.studentApplication.findMany({
				include: {
					std_status: true,
					std_regis_question: {
						include: {
							stf_regis_question_score: {
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
			throw new InternalServerErrorException(e);
		}
	}

	async answerGrading(userId: string, staffRegisGradingDto: StaffRegisGradingDto) {
		try {
			const scoreHistory = await this.prisma.applicationRegisQuestionScore.findMany({
				where: {
					std_regis_answer: {
						std_application_id: staffRegisGradingDto.application_id,
					},
					std_regis_answer_id: staffRegisGradingDto.answer_id,
				},
			});

			if (scoreHistory.length >= 2) {
				await this.prisma.applicationRegisQuestionScore.deleteMany({
					where: {
						std_regis_answer: {
							std_application_id: staffRegisGradingDto.application_id,
						},
						std_regis_answer_id: staffRegisGradingDto.answer_id,
						stf_count: staffRegisGradingDto.staff_count,
					},
				});
			}

			const createScore = await this.prisma.applicationRegisQuestionScore.create({
				data: {
					std_regis_answer_id: staffRegisGradingDto.answer_id,
					stf_count: staffRegisGradingDto.staff_count,
					stf_score: staffRegisGradingDto.score,
					stf_comment: staffRegisGradingDto.comment,
					stf_user_id: userId,
				},
			});

			const answerScore = await this.prisma.applicationRegisQuestionScore.findMany({
				where: {
					std_regis_answer: {
						std_application_id: staffRegisGradingDto.application_id,
					},
					std_regis_answer_id: staffRegisGradingDto.answer_id,
				},
				include: {
					stf_user: true,
				},
			});
			return answerScore;
		} catch (e) {
			throw new InternalServerErrorException(e);
		}
	}
}
