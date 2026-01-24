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
			include: {
				std_application: {
					include: {
						std_file: true,
						std_info: true,
						std_regis_question: {
							include: {
								stf_regis_question_score: {
									include: {
										stf_user: true,
									},
								},
							},
						},
						std_academic_question: {
							include: {
								stf_academic_question_score: {
									include: {
										stf_user: true,
									},
								},
							},
						},
						std_status: true,
					},
				},
			},
		});
	}
}
