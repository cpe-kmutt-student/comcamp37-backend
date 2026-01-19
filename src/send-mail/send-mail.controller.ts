import { Controller, Get } from "@nestjs/common";
import { Resend } from "resend";
import { SendMailService } from "./send-mail.service";

@Controller("/api/send-mail")
export class SendMailController {
	constructor(private readonly sendMailService: SendMailService) {}

	@Get("/test")
	async sendTest() {
		this.sendMailService.sendTest();
	}
}
