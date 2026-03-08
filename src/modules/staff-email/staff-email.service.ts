import { HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { EmailService } from "src/core/email/email.service";
import { PrismaService } from "src/core/prisma/prisma.service";
import { StaffSendEmailDto } from "./dto/staff-email.dto";

@Injectable()
export class StaffEmailService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly emailService: EmailService,
	) {}

	async staffSendEmail(staffId: string, staffName: string, staffSendEmailDto: StaffSendEmailDto) {
		let emailHasSent = false;

		try {
			await this.emailService.sendGeneralContent(staffSendEmailDto.email_to_email, staffSendEmailDto.email_to_name, staffSendEmailDto.email_subject, staffSendEmailDto.email_content, staffName).then(() => {
				emailHasSent = true;
			});
		} catch (e) {
			emailHasSent = false;
		}

		try {
			const saveHistory = await this.prisma.staffEmailHistory.create({
				data: {
					email_content: staffSendEmailDto.email_content,
					email_subject: staffSendEmailDto.email_subject,
					email_to_email: staffSendEmailDto.email_to_email,
					email_to_name: staffSendEmailDto.email_to_name,
					email_has_sent: emailHasSent,
					stf_user_id: staffId,
				},
			});

			return saveHistory;
		} catch (e) {
			throw new InternalServerErrorException(e);
		}
	}

	async staffGetAllEmail() {
		try {
			const emailHistory = await this.prisma.staffEmailHistory.findMany();
			return emailHistory;
		} catch (e) {
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}

	async staffGetAllEmailUser(query?: string) {
		try {
			const allEmailUser = await this.prisma.user.findMany({
				where: {
					role: "user",
				},
				select: {
					email: true,
				},
			});
			return query ? allEmailUser.map((em) => em.email).filter((em) => em.includes(query)) : allEmailUser.map((em) => em.email);
		} catch (e) {
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}
}
