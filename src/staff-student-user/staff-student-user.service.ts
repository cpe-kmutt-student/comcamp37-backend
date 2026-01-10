import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class StaffStudentUserService {
	constructor(private readonly prisma: PrismaService) {}

	async getStudentAll() {
		return await this.prisma.user.findMany({
			where: {
				role: "user",
			},
			include: {
				user_info: true,
				user_file: true,
				user_question: true,
				user_status: true,
			},
		});
	}

	async getStudentById(stdId: string) {
		return await this.prisma.user.findUnique({
			where: {
				id: stdId,
				role: "user",
			},
			include: {
				user_info: true,
				user_file: true,
				user_question: true,
				user_status: true,
			},
		});
	}
}
