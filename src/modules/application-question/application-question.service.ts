import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { LoggerService } from "src/core/logger/logger.service";
import { PrismaService } from "src/core/prisma/prisma.service";
import { StatusUpdaterService } from "../status-updater/status-updater.service";
import { AnswerQuestionDto } from "./dto/answer-question.dto";

@Injectable()
export class ApplicationQuestionService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly statusUpdaterService: StatusUpdaterService,
		private readonly logger: LoggerService,
	) {}

	async getRegisAnswerHistory(userId: string, appId?: string | undefined) {
		try {
			const regisAnswer = await this.prisma.applicationRegisQuestionAnswer.findMany({
				where: {
					std_application: {
						std_user_id: userId,
					},
					std_application_id: appId,
				},
			});

			if (regisAnswer.length === 0) {
				return new NotFoundException();
			}

			if (!appId) {
				return regisAnswer;
			}

			return regisAnswer[0];
		} catch (e) {
			this.logger.error(e);
			throw new InternalServerErrorException();
		}
	}

	async getAcademicAnswerHistory(userId: string, appId?: string | undefined) {
		try {
			const academicAnswer = await this.prisma.applicationAcademicQuestionAnswer.findMany({
				where: {
					std_application: {
						std_user_id: userId,
					},
					std_application_id: appId,
				},
			});

			if (academicAnswer.length === 0) {
				return new NotFoundException();
			}

			if (!appId) {
				return academicAnswer;
			}

			return academicAnswer[0];
		} catch (e) {
			this.logger.error(e);
			throw new InternalServerErrorException();
		}
	}

	async getAcademicChaosAnswerHistory(userId: string, appId?: string | undefined) {
		try {
			const academicChaosAnswer = await this.prisma.applicationAcademicChaosQuestionAnswer.findMany({
				where: {
					std_application: {
						std_user_id: userId,
					},
					std_application_id: appId,
				},
			});

			if (academicChaosAnswer.length === 0) {
				return new NotFoundException();
			}

			if (!appId) {
				return academicChaosAnswer;
			}

			return academicChaosAnswer[0];
		} catch (e) {
			this.logger.error(e);
			throw new InternalServerErrorException();
		}
	}

	async answerRegis(userId: string, answerQuestionDto: AnswerQuestionDto) {
		try {
			for (const answer of answerQuestionDto.answers) {
				const answered = await this.prisma.applicationRegisQuestionAnswer.findMany({
					where: {
						std_application_id: answerQuestionDto.application_id,
						std_application: {
							std_user_id: userId,
						},
						std_regis_answer_section: answer.section,
					},
				});

				if (answered.length === 0) {
					await this.prisma.applicationRegisQuestionAnswer.create({
						data: {
							std_application_id: answerQuestionDto.application_id,
							std_regis_answer_section: answer.section,
							std_regis_answer: answer.value,
						},
					});
					continue;
				}

				await this.prisma.applicationRegisQuestionAnswer.update({
					where: {
						std_regis_answer_id: answered[0].std_regis_answer_id,
					},
					data: {
						std_regis_answer: answer.value,
					},
				});
			}

			const updatedAnswer = await this.prisma.applicationRegisQuestionAnswer.findMany({
				where: {
					std_application_id: answerQuestionDto.application_id,
					std_application: {
						std_user_id: userId,
					},
				},
			});

			await this.statusUpdaterService.regisQuestionDoneUpdater(answerQuestionDto.application_id);

			return updatedAnswer;
		} catch (e) {
			this.logger.error(e);
			throw new InternalServerErrorException();
		}
	}

	async answerAcademic(userId: string, answerQuestionDto: AnswerQuestionDto) {
		try {
			for (const answer of answerQuestionDto.answers) {
				const answered = await this.prisma.applicationAcademicQuestionAnswer.findMany({
					where: {
						std_application_id: answerQuestionDto.application_id,
						std_application: {
							std_user_id: userId,
						},
						std_academic_answer_section: answer.section,
					},
				});

				if (answered.length === 0) {
					await this.prisma.applicationAcademicQuestionAnswer.create({
						data: {
							std_application_id: answerQuestionDto.application_id,
							std_academic_answer_section: answer.section,
							std_academic_answer: answer.value,
						},
					});
					continue;
				}

				await this.prisma.applicationAcademicQuestionAnswer.update({
					where: {
						std_academic_answer_id: answered[0].std_academic_answer_id,
					},
					data: {
						std_academic_answer: answer.value,
					},
				});
			}

			const updatedAnswer = await this.prisma.applicationAcademicQuestionAnswer.findMany({
				where: {
					std_application_id: answerQuestionDto.application_id,
					std_application: {
						std_user_id: userId,
					},
				},
			});

			await this.statusUpdaterService.academicQuestionDoneUpdater(answerQuestionDto.application_id);

			return updatedAnswer;
		} catch (e) {
			this.logger.error(e);
			throw new InternalServerErrorException();
		}
	}

	async answerAcademicChaos(userId: string, answerQuestionDto: AnswerQuestionDto) {
		try {
			for (const answer of answerQuestionDto.answers) {
				const answered = await this.prisma.applicationAcademicChaosQuestionAnswer.findMany({
					where: {
						std_application_id: answerQuestionDto.application_id,
						std_application: {
							std_user_id: userId,
						},
						std_academic_chaos_answer_section: answer.section,
					},
				});

				if (answered.length === 0) {
					await this.prisma.applicationAcademicChaosQuestionAnswer.create({
						data: {
							std_application_id: answerQuestionDto.application_id,
							std_academic_chaos_answer_section: answer.section,
							std_academic_chaos_answer: answer.value,
						},
					});
					continue;
				}

				await this.prisma.applicationAcademicChaosQuestionAnswer.update({
					where: {
						std_academic_chaos_answer_id: answered[0].std_academic_chaos_answer_id,
					},
					data: {
						std_academic_chaos_answer: answer.value,
					},
				});
			}

			const updatedAnswer = await this.prisma.applicationAcademicChaosQuestionAnswer.findMany({
				where: {
					std_application_id: answerQuestionDto.application_id,
					std_application: {
						std_user_id: userId,
					},
				},
			});

			await this.statusUpdaterService.academicQuestionChaosDoneUpdater(answerQuestionDto.application_id);

			return updatedAnswer;
		} catch (e) {
			this.logger.error(e);
			throw new InternalServerErrorException();
		}
	}
}
