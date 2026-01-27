import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
export class ApplicationStatusService {
	constructor(private readonly prisma: PrismaService) {}

	async findApplicationStatus(userId: string, appId: string) {
		try {
			const applicationStatus = await this.prisma.applicationStatus.findUnique({
				where: {
					std_application_id: appId,
					std_application: {
						std_user_id: userId,
					},
				},
			});

			return applicationStatus ? applicationStatus : new NotFoundException();
		} catch (e) {
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
			throw new InternalServerErrorException();
		}
	}
}
