import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
export class StatusUpdaterService {
	constructor(private readonly prisma: PrismaService) {}

	async fileDoneUpdater(appId: string) {
		try {
			const files = await this.prisma.applicationFile.findMany({
				where: {
					std_application_id: appId,
				},
			});

			const getAllUploadedType = files.map((f) => f.std_file_type);

			if (!getAllUploadedType.includes("file_face")) return;
			if (!getAllUploadedType.includes("file_national_id")) return;
			if (!getAllUploadedType.includes("file_parent_permission")) return;
			if (!getAllUploadedType.includes("file_pp_1")) return;
			if (!getAllUploadedType.includes("file_pp_7")) return;

			await this.prisma.applicationStatus.update({
				where: {
					std_application_id: appId,
				},
				data: {
					std_status_file_done: true,
				},
			});
		} catch (e) {
			console.error(e);
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
					return;
				}
			}

			await this.prisma.applicationStatus.update({
				where: {
					std_application_id: appId,
				},
				data: {
					std_status_info_done: true,
				},
			});
		} catch (e) {
			console.error(e);
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

			if (setAnsweredSections.length !== 6) {
				return;
			}

			await this.prisma.applicationStatus.update({
				where: {
					std_application_id: appId,
				},
				data: {
					std_status_regis_question_done: true,
				},
			});
		} catch (e) {
			console.log(e);
		}
	}

	async academicQuestionDoneUpdater(appId: string) {
		try {
			const regisQuestion = await this.prisma.applicationAcademicQuestionAnswer.findMany({
				where: {
					std_application_id: appId,
				},
			});

			const answeredSections = regisQuestion.map((rq) => rq.std_academic_answer_section);

			const [...setAnsweredSections] = new Set(answeredSections);

			if (setAnsweredSections.length !== 6) {
				return;
			}

			await this.prisma.applicationStatus.update({
				where: {
					std_application_id: appId,
				},
				data: {
					std_status_acdemic_question_done: true,
				},
			});
		} catch (e) {
			console.log(e);
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
				return;
			}

			await this.prisma.applicationStatus.update({
				where: {
					std_application_id: appId,
				},
				data: {
					std_status_payment_done: true,
				},
			});
		} catch (e) {
			console.log(e);
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
		} catch (e) {
			console.log(e);
		}
	}
}
