import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { LoggerService } from "src/core/logger/logger.service";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
export class StaffAcademicChaosQuestionService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly logger: LoggerService,
	) {}

	async getAllAcademicChaosAnswer() {
		try {
			const studentAcademicChaosAnswer = await this.prisma.studentApplication.findMany({
				include: {
					std_academic_chaos_question: {
						include: {
							stf_academic_chaos_question_score: true,
						},
					},
					std_status: true,
				},
			});

			return studentAcademicChaosAnswer.map((stdAns) => {
				let score = 0;
				for (const { stf_academic_chaos_question_score } of stdAns.std_academic_chaos_question) {
					for (const { stf_score } of stf_academic_chaos_question_score) {
						score += stf_score;
					}
				}
				return {
					...stdAns,
					total_score: score,
				};
			});
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}

	async getAcademicChaosAnswerByAppId(appId: string) {
		try {
			const studentAcademicChaosAnswer = await this.prisma.studentApplication.findUnique({
				where: {
					std_application_id: appId,
				},
				include: {
					std_academic_chaos_question: {
						include: {
							stf_academic_chaos_question_score: true,
						},
					},
					std_status: true,
				},
			});

			if (!studentAcademicChaosAnswer) throw new NotFoundException();

			let score = 0;
			for (const { stf_academic_chaos_question_score } of studentAcademicChaosAnswer.std_academic_chaos_question) {
				for (const { stf_score } of stf_academic_chaos_question_score) {
					score += stf_score;
				}
			}

			return {
				...studentAcademicChaosAnswer,
				total_score: score,
			};
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}
}
