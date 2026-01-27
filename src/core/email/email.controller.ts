import { Body, Controller, Post } from "@nestjs/common";
import { EmailService } from "./email.service";

@Controller("api/mail")
export class EmailController {
	constructor(private readonly emailService: EmailService) {}

	@Post("announce-test")
	async testAnnouncement(@Body() body: { email: string; name: string }) {
		return await this.emailService.sendResultAnnouncement(body.email, body.name);
	}
}
