import { HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { EmailService } from "src/core/email/email.service";
import { LoggerService } from "src/core/logger/logger.service";
import { PrismaService } from "src/core/prisma/prisma.service";
import { StaffSendEmailDto } from "./dto/staff-email.dto";

@Injectable()
export class StaffEmailService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly emailService: EmailService,
		private readonly logger: LoggerService,
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
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}

	async staffGetAllEmail() {
		try {
			const emailHistory = await this.prisma.staffEmailHistory.findMany({
				include: {
					stf_user: true,
				},
			});
			return emailHistory;
		} catch (e) {
			this.logger.error(e);
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
				include: {
					std_application: {
						include: {
							std_info: true,
						},
					},
				},
			});

			const mapEmailAndName = allEmailUser.map((em) => ({
				email: em.email,
				name: decodeURI(em.std_application[0]?.std_info?.std_info_nick_name || ""),
			}));

			return query ? mapEmailAndName.filter((em) => em.email.includes(query)) : mapEmailAndName;
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}
}
