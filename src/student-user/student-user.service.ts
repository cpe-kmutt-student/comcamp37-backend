import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { StudentUserId } from "src/types/Student.type";

@Injectable()
export class StudentUserService {
	constructor(private readonly prisma: PrismaService) {}

	async getMe(user: StudentUserId) {
		return this.prisma.studentUsers.findUnique({
			where: {
				std_user_id: user.std_user_id,
			},
		});
	}

	async getDetails(user: StudentUserId) {
		return this.prisma.studentInfo.findUnique({
			where: {
				std_user_id: user.std_user_id,
			},
		});
	}

	async getStatus(user: StudentUserId) {
		return this.prisma.studentStatus.findUnique({
			where: {
				std_user_id: user.std_user_id,
			},
		});
	}

	async getQuestions(user: StudentUserId) {
		return this.prisma.studentQuestions.findUnique({
			where: {
				std_user_id: user.std_user_id,
			},
		});
	}

	async getFiles(user: StudentUserId) {
		return this.prisma.studentFiles.findUnique({
			where: {
				std_user_id: user.std_user_id,
			},
		});
	}
}
