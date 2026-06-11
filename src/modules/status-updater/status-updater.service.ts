import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { FileType } from "generated/prisma/enums";
import { LoggerService } from "src/core/logger/logger.service";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
export class StatusUpdaterService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly logger: LoggerService,
	) {}

	private readonly file;

	async fileDoneUpdater(appId: string) {
		try {
			const files = await this.prisma.applicationFile.findMany({
				where: {
					std_application_id: appId,
				},
			});

			const getAllUploadedType = files.map((f) => f.std_file_type);

			const missingFile = Object.values(FileType)
				.filter((f) => f !== "file_slip")
				.filter((f) => !getAllUploadedType.includes(f));

			if (missingFile.length !== 0) {
				return;
			}

			return await this.prisma.applicationStatus.update({
				where: {
					std_application_id: appId,
				},
				data: {
					std_status_file_done: true,
				},
			});
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}

	async infoDoneUpdater(appId: string) {
		try {
			const appInfo = await this.prisma.applicationInfo.findUnique({
				where: {
					std_application_id: appId,
				},
			});

			for (const info in appInfo) {
				if (appInfo[info] === null) {
					throw new NotFoundException();
				}
			}

			return await this.prisma.applicationStatus.update({
				where: {
					std_application_id: appId,
				},
				data: {
					std_status_info_done: true,
				},
			});
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}

	async regisQuestionDoneUpdater(appId: string) {
		try {
			const regisQuestion = await this.prisma.applicationRegisQuestionAnswer.findMany({
				where: {
					std_application_id: appId,
				},
			});

			const answeredSections = regisQuestion.map((rq) => rq.std_regis_answer_section);

			const [...setAnsweredSections] = new Set(answeredSections);

			if (setAnsweredSections.length < 6) {
				throw new NotFoundException();
			}

			return await this.prisma.applicationStatus.update({
				where: {
					std_application_id: appId,
				},
				data: {
					std_status_regis_question_done: true,
				},
			});
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}

	async academicQuestionDoneUpdater(appId: string) {
		try {
			const academicQuestion = await this.prisma.applicationAcademicQuestionAnswer.findMany({
				where: {
					std_application_id: appId,
				},
			});

			const answeredSections = academicQuestion.map((rq) => rq.std_academic_answer_section);

			const [...setAnsweredSections] = new Set(answeredSections);

			if (setAnsweredSections.length < 12) {
				throw new NotFoundException();
			}

			return await this.prisma.applicationStatus.update({
				where: {
					std_application_id: appId,
				},
				data: {
					std_status_acdemic_question_done: true,
				},
			});
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}

	async academicQuestionChaosDoneUpdater(appId: string) {
		try {
			const academicChaosQuestion = await this.prisma.applicationAcademicChaosQuestionAnswer.findMany({
				where: {
					std_application_id: appId,
				},
			});

			const answeredSections = academicChaosQuestion.map((rq) => rq.std_academic_chaos_answer_section);

			const [...setAnsweredSections] = new Set(answeredSections);

			if (setAnsweredSections.length < 6) {
				throw new NotFoundException();
			}

			return await this.prisma.applicationStatus.update({
				where: {
					std_application_id: appId,
				},
				data: {
					std_status_academic_chaos_question_done: true,
				},
			});
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}

	async paymentDoneUpdater(appId: string) {
		try {
			const appFiles = await this.prisma.applicationFile.findMany({
				where: {
					std_application_id: appId,
				},
			});

			const findPaymentEvidence = appFiles.filter((f) => f.std_file_type === "file_slip");

			if (findPaymentEvidence.length === 0) {
				throw new NotFoundException();
			}

			return await this.prisma.applicationStatus.update({
				where: {
					std_application_id: appId,
				},
				data: {
					std_status_payment_done: true,
				},
			});
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}

	async updateAllApplicationStatus(userId: string) {
		try {
			const studentApplication = await this.prisma.studentApplication.findMany({
				where: {
					std_user_id: userId,
				},
				select: {
					std_application_id: true,
				},
			});

			for (const { std_application_id } of studentApplication) {
				await this.fileDoneUpdater(std_application_id);
				await this.infoDoneUpdater(std_application_id);
				await this.regisQuestionDoneUpdater(std_application_id);
				await this.academicQuestionDoneUpdater(std_application_id);
				await this.paymentDoneUpdater(std_application_id);
			}

			return await this.prisma.studentApplication.findMany({
				where: {
					std_user_id: userId,
				},
				include: {
					std_status: true,
				},
			});
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}
}
