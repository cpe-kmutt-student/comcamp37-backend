import { Module } from "@nestjs/common";
import { StaffStudentQuestionController } from "./staff-student-question.controller";
import { StaffStudentQuestionService } from "./staff-student-question.service";

@Module({
	controllers: [StaffStudentQuestionController],
	providers: [StaffStudentQuestionService],
})
export class StaffStudentQuestionModule {}
