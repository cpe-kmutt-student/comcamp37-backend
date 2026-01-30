import { Injectable } from "@nestjs/common";
import { EmailService } from "src/core/email/email.service";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
export class EmailNotificationService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly emailService: EmailService,
	) {}

	async sendAnnouncement(toEmail: string, toName: string) {
		return this.emailService.sendAnnouncement(toEmail, toName);
	}

	async sendRegistrationConfirm(toEmail: string, toName: string) {
		return this.emailService.sendRegistrationConfirm(toEmail, toName);
	}

	async sendContentIssue(toEmail: string, toName: string, issueDetail: string, deadline?: string) {
		return this.emailService.sendContentIssue(toEmail, toName, issueDetail, deadline);
	}

	async sendTracking(toEmail: string, toName: string, appId: string, trackingNumber: string, provider: string) {
		return this.emailService.sendTracking(toEmail, toName, appId, trackingNumber, provider);
	}
}
