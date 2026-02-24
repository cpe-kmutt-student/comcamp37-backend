import { Module } from "@nestjs/common";
import { EmailModule } from "src/core/email/email.module";
import { EmailService } from "src/core/email/email.service";
import { ApplicationSubmitController } from "./application-submit.controller";
import { ApplicationSubmitService } from "./application-submit.service";

@Module({
	imports: [EmailModule],
	controllers: [ApplicationSubmitController],
	providers: [ApplicationSubmitService],
})
export class ApplicationSubmitModule {}
