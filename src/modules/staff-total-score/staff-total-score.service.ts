import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { LoggerService } from "src/core/logger/logger.service";
import { PrismaService } from "src/core/prisma/prisma.service";
import { CalculateScoreService } from "./calculate-score.service";

@Injectable()
export class StaffTotalScoreService {
	private isCalculateRunInProgress = false;

	constructor(
		private readonly prisma: PrismaService,
		private readonly logger: LoggerService,
		private readonly calculateScoreService: CalculateScoreService,
	) {}

	async getAppTotalScore(appId?: string) {
		try {
			const applicationScore = await this.prisma.studentApplication.findMany({
				where: {
					std_application_id: appId,
				},
				include: {
					std_total_score: true,
					std_status: true,
					std_info: true,
				},
			});

			if (appId && applicationScore.length === 0) {
				throw new NotFoundException();
			}

			return appId ? applicationScore[0] : applicationScore;
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}

	async calculateRun(appId?: string) {
		if (this.isCalculateRunInProgress) {
			return {
				message: "Score calculation is already running",
				application_id: appId,
				running: true,
			};
		}

		this.isCalculateRunInProgress = true;

		try {
			const applications = await this.prisma.studentApplication.findMany({
				where: {
					std_application_id: appId,
				},
				select: {
					std_application_id: true,
				},
			});

			if (applications.length === 0) {
				throw new NotFoundException();
			}

			void this.processCalculateRun(
				applications.map(({ std_application_id }) => std_application_id),
				appId,
			);

			return {
				message: "Score calculation started",
				application_id: appId,
				total_queue: applications.length,
			};
		} catch (e) {
			this.isCalculateRunInProgress = false;
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}

	private async processCalculateRun(applicationIds: string[], appId?: string) {
		try {
			this.logger.info(`Start calculate run in background${appId ? ` for appId ${appId}` : " for all applications"}. Total: ${applicationIds.length}`);

			for (const std_application_id of applicationIds) {
				try {
					const calScore = await this.calculateScoreService.calculateAndUpdateScore(std_application_id);
					this.logger.success(`Updated : ${calScore.std_application_id}, Regis ${calScore.std_regis_score} | Academic ${calScore.std_academic_score} | Chaos ${calScore.std_academic_chaos_score}`);
				} catch (e) {
					this.logger.error(`Fail to Update : ${std_application_id}, ${e.message}`);
				}
			}

			this.logger.info(`Finish calculate run in background${appId ? ` for appId ${appId}` : " for all applications"}. Total: ${applicationIds.length}`);
		} finally {
			this.isCalculateRunInProgress = false;
		}
	}
}
