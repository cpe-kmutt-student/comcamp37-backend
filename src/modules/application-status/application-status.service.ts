import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { LoggerService } from "src/core/logger/logger.service";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
export class ApplicationStatusService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly logger: LoggerService,
	) {}

	async findApplicationStatus(userId: string, appId: string) {
		try {
			const applicationStatus = await this.prisma.applicationStatus.findUnique({
				where: {
					std_application_id: appId,
					std_application: {
						std_user_id: userId,
					},
				},
				include: {
					std_application: true,
				},
			});

			return applicationStatus ? applicationStatus : new NotFoundException();
		} catch (e) {
			this.logger.error(e);
			throw new InternalServerErrorException();
		}
	}

	async getAllApplicationStatus(userId: string) {
		try {
			const applicationStatus = await this.prisma.applicationStatus.findMany({
				where: {
					std_application: {
						std_user_id: userId,
					},
				},
			});

			return applicationStatus.length !== 0 ? applicationStatus : new NotFoundException();
		} catch (e) {
			this.logger.error(e);
			throw new InternalServerErrorException();
		}
	}
}
