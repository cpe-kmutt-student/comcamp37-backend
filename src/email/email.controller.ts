import { Body, Controller, Post } from "@nestjs/common";
import { EmailService } from "./email.service";

@Controller("api/mail")
export class EmailController {
	constructor(private readonly emailService: EmailService) {}

	@Post("announce-test")
	async testAnnouncement(@Body() body: { email: string; name: string }) {
		return await this.emailService.sendAnnouncement(body.email, body.name);
	}

	@Post("registration-confirm-test")
	async testRegistrationConfirm(@Body() body: { email: string; name: string }) {
		return await this.emailService.sendRegistrationConfirm(body.email, body.name);
	}

	@Post("content-issue-test")
	async testContentIssue(@Body() body: { email: string; name: string; issueDetail: string; deadline: string }) {
		return await this.emailService.sendContentIssue(body.email, body.name, body.issueDetail, body.deadline);
	}

	@Post("tracking-test")
	async testTracking(@Body() body: { email: string; name: string; orderId: string; trackingNumber: string; provider: string }) {
		return await this.emailService.sendTracking(body.email, body.name, body.orderId, body.trackingNumber, body.provider);
	}
}
