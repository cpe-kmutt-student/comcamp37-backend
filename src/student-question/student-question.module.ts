import { Module } from "@nestjs/common";
import { StudentQuestionController } from "./student-question.controller";
import { StudentQuestionService } from "./student-question.service";

@Module({
	controllers: [StudentQuestionController],
	providers: [StudentQuestionService],
})
export class StudentQuestionModule {}
