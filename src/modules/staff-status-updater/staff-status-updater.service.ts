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
				throw new Error("Grading not complete yet");
			}

			const updatedStatus = await this.prisma.applicationStatus.update({
				where: {
					std_application_id: appId,
				},
				data: {
					stf_regis_question_checked: true,
				},
			});

			return updatedStatus;
		} catch (e) {
			this.logger.error(e);
			throw new InternalServerErrorException(e);
		}
	}
}
