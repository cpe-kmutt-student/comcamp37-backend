import { ForbiddenException, Injectable, InternalServerErrorException, NotAcceptableException } from "@nestjs/common";
import { EmailService } from "src/core/email/email.service";
import { LoggerService } from "src/core/logger/logger.service";
import { PrismaService } from "src/core/prisma/prisma.service";
import { ApplicationSubmitDto } from "./dto/application-submit.dto";

@Injectable()
export class ApplicationSubmitService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly logger: LoggerService,
		private readonly emailService: EmailService,
	) {}

	async applicationSubmit(userId: string, applicationSubmitDto: ApplicationSubmitDto) {
		try {
			if (!applicationSubmitDto.confirm) {
				throw new NotAcceptableException();
			}

			const applicationStatus = await this.prisma.studentApplication.findUnique({
				where: {
					std_user_id: userId,
					std_application_id: applicationSubmitDto.application_id,
				},
				select: {
					std_status: {
						select: {
							std_status_info_done: true,
							std_status_regis_question_done: true,
							std_status_acdemic_question_done: true,
							std_status_academic_chaos_question_done: true,
							std_status_file_done: true,
						},
					},
				},
			});

			if (
				!applicationStatus?.std_status?.std_status_info_done ||
				!applicationStatus?.std_status?.std_status_regis_question_done ||
				!applicationStatus?.std_status?.std_status_acdemic_question_done ||
				!applicationStatus?.std_status?.std_status_academic_chaos_question_done ||
				!applicationStatus?.std_status?.std_status_file_done
			) {
				throw new ForbiddenException();
			}

			const updateSubmitStatus = await this.prisma.studentApplication.update({
				where: {
					std_user_id: userId,
					std_application_id: applicationSubmitDto.application_id,
				},
				data: {
					std_application_submit: true,
				},
			});

			// Send submit confirm email
			const userInfo = await this.prisma.applicationInfo.findUnique({
				where: {
					std_application_id: applicationSubmitDto.application_id,
				},
				include: {
					std_application: {
						include: {
							std_user: true,
						},
					},
				},
			});
			if (userInfo) {
				await this.emailService.sendRegistrationConfirm(userInfo.std_application.std_user.email, `${decodeURI(userInfo.std_info_nick_name || "")}`);
			}

			return updateSubmitStatus;
		} catch (e) {
			this.logger.error(e);
			throw new InternalServerErrorException();
		}
	}
}
