import { Module } from "@nestjs/common";
import { EmailModule } from "src/core/email/email.module";
import { EmailNotificationController } from "./email-notification.controller";
import { EmailNotificationService } from "./email-notification.service";

@Module({
	imports: [EmailModule],
	controllers: [EmailNotificationController],
	providers: [EmailNotificationService],
})
export class EmailNotificationModule {}
