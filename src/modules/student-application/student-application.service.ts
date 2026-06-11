import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { LoggerService } from "src/core/logger/logger.service";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
export class StudentApplicationService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly logger: LoggerService,
	) {}

	async getApplications(userId: string) {
		try {
			const studentApplication = await this.prisma.studentApplication.findMany({
				where: {
					std_user_id: userId,
					std_user: {
						role: "user",
					},
				},
				include: {
					std_info: true,
					std_file: true,
					std_regis_question: true,
					std_academic_question: true,
					std_academic_chaos_question: true,
					std_status: true,
				},
				omit: {
					std_application_result: true,
				},
			});

			if (studentApplication.length === 0) {
				throw new NotFoundException();
			}

			return studentApplication;
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}

	async findApplication(userId: string, appId: string) {
		try {
			const studentApplication = await this.prisma.studentApplication.findUnique({
				where: {
					std_user_id: userId,
					std_application_id: appId,
					std_user: {
						role: "user",
					},
				},
				include: {
					std_info: true,
					std_file: true,
					std_regis_question: true,
					std_academic_question: true,
					std_academic_chaos_question: true,
					std_status: true,
				},
				omit: {
					std_application_result: true,
				},
			});

			if (!studentApplication) throw new NotFoundException();

			return studentApplication;
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}

	async createApplication(userId: string) {
		try {
			const studentApplication = await this.prisma.studentApplication.create({
				data: {
					std_user_id: userId,
				},
			});

			await this.prisma.applicationInfo.create({
				data: {
					std_application_id: studentApplication.std_application_id,
				},
			});

			await this.prisma.applicationStatus.create({
				data: {
					std_application_id: studentApplication.std_application_id,
				},
			});

			return await this.prisma.studentApplication.findUnique({
				where: {
					std_application_id: studentApplication.std_application_id,
					std_user_id: userId,
					std_user: {
						role: "user",
					},
				},
				include: {
					std_info: true,
					std_file: true,
					std_regis_question: true,
					std_academic_question: true,
					std_academic_chaos_question: true,
					std_status: true,
				},
				omit: {
					std_application_result: true,
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

	async getApplicationResult(userId: string, appId: string) {
		try {
			const studentApplication = await this.prisma.studentApplication.findUnique({
				where: {
					std_application_id: appId,
					std_user: {
						id: userId,
					},
				},
				select: {
					std_application_id: true,
					std_application_result: true,
					std_user: {
						select: {
							id: true,
						},
					},
				},
			});

			if (!studentApplication) {
				throw new NotFoundException();
			}

			return studentApplication;
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}
}
