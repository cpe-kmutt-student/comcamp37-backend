import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { LoggerService } from "src/core/logger/logger.service";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
export class StaffStatusUpdaterService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly logger: LoggerService,
	) {}

	async updateRegisQuestionCheckedStatus(appId: string) {
		try {
			const answer = await this.prisma.applicationRegisQuestionAnswer.findMany({
				where: {
					std_application_id: appId,
				},
				include: {
					stf_regis_question_score: true,
				},
			});

			const unCompleteCheck = answer.filter((ans) => {
				return ans.stf_regis_question_score.length < 2;
			});

			if (unCompleteCheck.length !== 0) {
				throw new Error("Regis Grading not complete yet");
			}

			const updatedStatus = await this.prisma.applicationStatus.update({
				where: {
					std_application_id: appId,
				},
				data: {
					stf_regis_question_checked: true,
				},
			});

			this.logger.info("Updated Regis Question Check Status");

			return updatedStatus;
		} catch (e) {
			this.logger.error(e);
			// throw new InternalServerErrorException(e);
		}
	}

	async updateAcademicQuestionCheckedStatus(appId: string) {
		try {
			const answer = await this.prisma.applicationAcademicQuestionAnswer.findMany({
				where: {
					std_application_id: appId,
				},
				include: {
					stf_academic_question_score: true,
				},
			});

			const unCompleteCheck = answer.filter((ans) => {
				return ans.stf_academic_question_score.length === 0;
			});

			if (unCompleteCheck.length !== 0) {
				throw new Error("Academic Grading not complete yet");
			}

			const updatedStatus = await this.prisma.applicationStatus.update({
				where: {
					std_application_id: appId,
				},
				data: {
					stf_academic_question_checked: true,
				},
			});

			this.logger.info("Updated Academic Question Check Status");

			return updatedStatus;
		} catch (e) {
			this.logger.error(e);
			// throw new InternalServerErrorException(e);
		}
	}

	async updateAcademicChaosQuestionCheckedStatus(appId: string) {
		try {
			const answer = await this.prisma.applicationAcademicChaosQuestionAnswer.findMany({
				where: {
					std_application_id: appId,
				},
				include: {
					stf_academic_chaos_question_score: true,
				},
			});

			const unCompleteCheck = answer.filter((ans) => {
				return ans.stf_academic_chaos_question_score.length === 0;
			});

			if (unCompleteCheck.length !== 0) {
				throw new Error("Academic Chaos Grading not complete yet");
			}

			const updatedStatus = await this.prisma.applicationStatus.update({
				where: {
					std_application_id: appId,
				},
				data: {
					stf_academic_chaos_question_checked: true,
				},
			});

			this.logger.info("Updated Academic Chaos Question Check Status");

			return updatedStatus;
		} catch (e) {
			this.logger.error(e);
			// throw new InternalServerErrorException(e);
		}
	}
}
