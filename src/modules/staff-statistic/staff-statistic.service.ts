import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
export class StaffStatisticService {
	constructor(private readonly prisma: PrismaService) {}

	async getCountAll() {
		const studentUserCount = await this.prisma.user.count({
			where: {
				role: "user",
			},
		});
		const applicationCount = await this.prisma.studentApplication.count();
		const submitedApplicationCount = await this.prisma.studentApplication.count({
			where: {
				std_application_submit: true,
			},
		});

		const applicationInfoDoneCount = await this.prisma.applicationStatus.count({
			where: {
				std_status_info_done: true,
			},
		});
		const applicationFileDoneCount = await this.prisma.applicationStatus.count({
			where: {
				std_status_file_done: true,
			},
		});
		const applicationRegisQuestionDoneCount = await this.prisma.applicationStatus.count({
			where: {
				std_status_regis_question_done: true,
			},
		});
		const applicationPaymentDoneCount = await this.prisma.applicationStatus.count({
			where: {
				std_status_payment_done: true,
			},
		});

		const studentMaleCount = await this.prisma.applicationInfo.count({
			where: {
				std_info_gender: "male",
			},
		});
		const studentFemaleCount = await this.prisma.applicationInfo.count({
			where: {
				std_info_gender: "female",
			},
		});

		return {
			user: studentUserCount,
			app: applicationCount,
			app_submit: submitedApplicationCount,
			app_info_done: applicationInfoDoneCount,
			app_file_done: applicationFileDoneCount,
			app_regis_question_doen: applicationRegisQuestionDoneCount,
			app_payment_done: applicationPaymentDoneCount,
			student_male: studentMaleCount,
			student_female: studentFemaleCount,
		};
	}
}
