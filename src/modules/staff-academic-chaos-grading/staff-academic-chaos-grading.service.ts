import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { LoggerService } from "src/core/logger/logger.service";
import { PrismaService } from "src/core/prisma/prisma.service";
import { StaffStatusUpdaterService } from "../staff-status-updater/staff-status-updater.service";
import { StaffAcademicChaosGradingDto } from "./dto/staff-academic-chaos-grading.dto";

@Injectable()
export class StaffAcademicChaosGradingService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly logger: LoggerService,
		private readonly staffStatusUpdaterService: StaffStatusUpdaterService,
	) {}

	async getAll() {
		try {
			const allAnswers = await this.prisma.studentApplication.findMany({
				where: {
					std_application_submit: true,
				},
				include: {
					std_status: true,
					std_academic_chaos_question: {
						include: {
							stf_academic_chaos_question_score: {
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
			const allAnswers = await this.prisma.applicationAcademicChaosQuestionAnswer.findMany({
				where: {
					std_application_id: appId,
				},
				include: {
					stf_academic_chaos_question_score: {
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

	async answerGrading(userId: string, staffAcademicChaosGradingDto: StaffAcademicChaosGradingDto) {
		try {
			// Delete existing score by the same staff before creating a new one
			await this.prisma.applicationAcademicChaosQuestionScore.deleteMany({
				where: {
					std_academic_chaos_answer: {
						std_application_id: staffAcademicChaosGradingDto.application_id,
					},
					std_academic_chaos_answer_id: staffAcademicChaosGradingDto.answer_id,
					stf_count: 1,
				},
			});

			const createScore = await this.prisma.applicationAcademicChaosQuestionScore.create({
				data: {
					std_academic_chaos_answer_id: staffAcademicChaosGradingDto.answer_id,
					stf_count: 1,
					stf_score: staffAcademicChaosGradingDto.score,
					stf_user_id: userId,
				},
			});

			const answerScore = await this.prisma.applicationAcademicChaosQuestionScore.findMany({
				where: {
					std_academic_chaos_answer: {
						std_application_id: staffAcademicChaosGradingDto.application_id,
					},
					std_academic_chaos_answer_id: staffAcademicChaosGradingDto.answer_id,
				},
				include: {
					stf_user: true,
				},
			});

			await this.staffStatusUpdaterService.updateAcademicChaosQuestionCheckedStatus(staffAcademicChaosGradingDto.application_id);
			return answerScore;
		} catch (e) {
			this.logger.error(e);
			throw new InternalServerErrorException(e);
		}
	}
}
