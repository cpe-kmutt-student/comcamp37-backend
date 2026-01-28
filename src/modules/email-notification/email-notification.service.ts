import { Injectable } from "@nestjs/common";
import { EmailService } from "src/core/email/email.service";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
export class EmailNotificationService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly emailService: EmailService,
	) {}
}
