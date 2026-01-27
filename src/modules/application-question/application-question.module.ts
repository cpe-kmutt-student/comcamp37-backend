import { Module } from "@nestjs/common";
import { ApplicationQuestionController } from "./application-question.controller";
import { ApplicationQuestionService } from "./application-question.service";

@Module({
	controllers: [ApplicationQuestionController],
	providers: [ApplicationQuestionService],
})
export class ApplicationQuestionModule {}
