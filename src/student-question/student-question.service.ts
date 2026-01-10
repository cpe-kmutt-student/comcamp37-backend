import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class StudentQuestionService {
	constructor(private readonly prisma: PrismaService) {}

	answerQuestion(userId: string, section: string, answer: string) {
		return "asdasda";
	}
}
