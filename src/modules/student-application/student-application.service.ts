import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
export class StudentApplicationService {
	constructor(private readonly prisma: PrismaService) {}

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
			});

			return studentApplication.length !== 0 ? studentApplication : new NotFoundException();
		} catch (e) {
			throw new InternalServerErrorException();
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
			});

			return studentApplication ? studentApplication : new NotFoundException();
		} catch (e) {
			throw new InternalServerErrorException();
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
			});
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
