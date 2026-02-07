import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
export class StaffRegisQuestionService {
	constructor(private readonly prisma: PrismaService) {}

	async getAllRegisAnswer() {
		try {
			const studentRegisAnswer = await this.prisma.studentApplication.findMany({
				include: {
					std_regis_question: {
						include: {
							stf_regis_question_score: true,
						},
					},
					std_status: true,
				},
			});

			return studentRegisAnswer.map((stdAns) => {
				let score = 0;
				for (const { stf_regis_question_score } of stdAns.std_regis_question) {
					for (const { stf_score } of stf_regis_question_score) {
						score += stf_score;
					}
				}
				return {
					...stdAns,
					total_score: score,
				};
			});
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	async getRegisAnswerByAppId(appId: string) {
		try {
			const studentRegisAnswer = await this.prisma.studentApplication.findUnique({
				where: {
					std_application_id: appId,
				},
				include: {
					std_regis_question: {
						include: {
							stf_regis_question_score: true,
						},
					},
					std_status: true,
				},
			});

			if (!studentRegisAnswer) return new NotFoundException();

			let score = 0;
			for (const { stf_regis_question_score } of studentRegisAnswer.std_regis_question) {
				for (const { stf_score } of stf_regis_question_score) {
					score += stf_score;
				}
			}

			return {
				...studentRegisAnswer,
				total_score: score,
			};
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
