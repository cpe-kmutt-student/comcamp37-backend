import { Injectable } from "@nestjs/common";
import type { UserSession } from "@thallesp/nestjs-better-auth";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class StudentUserService {
	constructor(private readonly prisma: PrismaService) {}

	async getMe(userId: string) {
		return this.prisma.user.findUnique({
			where: {
				id: userId,
			},
		});
	}

	async getInfo(userId: string) {
		return this.prisma.studentInfo.findUnique({
			where: {
				std_user_id: userId,
			},
		});
	}

	async getStatus(userId: string) {
		return this.prisma.studentStatus.findUnique({
			where: {
				std_user_id: userId,
			},
		});
	}

	async getQuestions(userId: string) {
		return this.prisma.studentQuestions.findUnique({
			where: {
				std_user_id: userId,
			},
		});
	}

	async getFiles(userId: string) {
		return this.prisma.studentFiles.findUnique({
			where: {
				std_user_id: userId,
			},
		});
	}
}
