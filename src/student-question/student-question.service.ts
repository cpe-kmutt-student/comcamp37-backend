import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
export class StudentQuestionService {
	constructor(private readonly prisma: PrismaService) {}

	async answerQuestion(userId: string, section: string, answer: string) {
		// try {
		// 	const studentQuestion = await this.prisma.studentQuestions.findUnique({
		// 		where: {
		// 			std_user_id: userId,
		// 		},
		// 	});
		// 	if (!studentQuestion) {
		// 		await this.prisma.studentQuestions.create({
		// 			data: {
		// 				std_user_id: userId,
		// 			},
		// 		});
		// 	}
		// 	const updateStudentQuestion = await this.prisma.studentQuestions.update({
		// 		where: {
		// 			std_user_id: userId,
		// 		},
		// 		data: {
		// 			std_q_1: section === "1" ? answer : undefined,
		// 			std_q_2: section === "2" ? answer : undefined,
		// 			std_q_3: section === "3" ? answer : undefined,
		// 			std_q_4: section === "4" ? answer : undefined,
		// 			std_q_5: section === "5" ? answer : undefined,
		// 		},
		// 	});
		// 	return updateStudentQuestion;
		// } catch (e) {
		// 	throw new InternalServerErrorException();
		// }
	}

	async getAnswerBySection(userId: string, section: string) {
		// 	try {
		// 		const studentQuestion = await this.prisma.studentQuestions.findUnique({
		// 			where: {
		// 				std_user_id: userId,
		// 			},
		// 			select: {
		// 				std_q_1: section === "1",
		// 				std_q_2: section === "2",
		// 				std_q_3: section === "3",
		// 				std_q_4: section === "4",
		// 				std_q_5: section === "5",
		// 				updated_at: true,
		// 			},
		// 		});
		// 		return {
		// 			section: section,
		// 			answer: studentQuestion?.std_q_1 || studentQuestion?.std_q_2 || studentQuestion?.std_q_3 || studentQuestion?.std_q_4 || studentQuestion?.std_q_5,
		// 			updated_at: studentQuestion?.updated_at,
		// 		};
		// 	} catch (e) {
		// 		throw new InternalServerErrorException();
		// 	}
	}

	async getAll(userId: string) {
		// try {
		// 	const studentQuestion = await this.prisma.studentQuestions.findUnique({
		// 		where: {
		// 			std_user_id: userId,
		// 		},
		// 	});
		// 	return studentQuestion;
		// } catch (e) {
		// 	throw new InternalServerErrorException();
		// }
	}
}
