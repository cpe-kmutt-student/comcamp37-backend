import { Module } from "@nestjs/common";
import { StaffRegisQuestionController } from "./staff-regis-question.controller";
import { StaffRegisQuestionService } from "./staff-regis-question.service";

@Module({
	controllers: [StaffRegisQuestionController],
	providers: [StaffRegisQuestionService],
})
export class StaffRegisQuestionModule {}
