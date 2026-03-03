import { Module } from "@nestjs/common";
import { StaffAcademicQuestionController } from "./staff-academic-question.controller";
import { StaffAcademicQuestionService } from "./staff-academic-question.service";

@Module({
	controllers: [StaffAcademicQuestionController],
	providers: [StaffAcademicQuestionService],
})
export class StaffAcademicQuestionModule {}
