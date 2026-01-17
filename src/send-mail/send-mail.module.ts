import { Module } from "@nestjs/common";
import { SendMailController } from "./send-mail.controller";
import { SendMailService } from "./send-mail.service";

@Module({
	controllers: [SendMailController],
	providers: [SendMailService],
})
export class SendMailModule {}
