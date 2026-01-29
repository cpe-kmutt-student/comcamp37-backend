import { Module } from "@nestjs/common";
import { StatusUpdaterModule } from "../status-updater/status-updater.module";
import { ApplicationQuestionController } from "./application-question.controller";
import { ApplicationQuestionService } from "./application-question.service";

@Module({
	imports: [StatusUpdaterModule],
	controllers: [ApplicationQuestionController],
	providers: [ApplicationQuestionService],
})
export class ApplicationQuestionModule {}
