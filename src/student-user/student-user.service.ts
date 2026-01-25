import { Injectable } from "@nestjs/common";
import type { UserSession } from "@thallesp/nestjs-better-auth";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class StudentUserService {
	constructor(private readonly prisma: PrismaService) {}

	async getUser(userId: string) {
		return this.prisma.user.findUnique({
			where: {
				id: userId,
				role: "user",
			},
		});
	}
}
