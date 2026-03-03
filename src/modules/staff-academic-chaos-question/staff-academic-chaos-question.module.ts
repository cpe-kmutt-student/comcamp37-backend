import { Module } from "@nestjs/common";
import { StaffAcademicChaosQuestionController } from "./staff-academic-chaos-question.controller";
import { StaffAcademicChaosQuestionService } from "./staff-academic-chaos-question.service";

@Module({
	controllers: [StaffAcademicChaosQuestionController],
	providers: [StaffAcademicChaosQuestionService],
})
export class StaffAcademicChaosQuestionModule {}
