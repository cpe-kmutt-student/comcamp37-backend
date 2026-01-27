import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { ApplicationConfirmationDto } from "./dto/application-confirmation.dto";

@Injectable()
export class ApplicationConfirmationService {
	constructor(private readonly prisma: PrismaService) {}

	async getApplicationConfirmation(userId: string, appId?: string) {
		try {
			const confirmation = await this.prisma.studentApplication.findMany({
				where: {
					std_user_id: userId,
					std_application_id: appId,
				},
				select: {
					std_application_pass: true,
					std_application_abort_reason: true,
					std_application_confirm: true,
					std_application_submit: true,
					updated_at: true,
					created_at: true,
				},
			});

			if (confirmation.length === 0) {
				return new NotFoundException();
			}

			if (!appId) {
				return confirmation;
			}

			return confirmation[0];
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	async isConfirmApplication(userId: string, applicationConfirmation: ApplicationConfirmationDto) {
		try {
			const studentApplication = await this.prisma.studentApplication.findUnique({
				where: {
					std_user_id: userId,
					std_user: {
						role: "user",
					},
					std_application_id: applicationConfirmation.application_id,
					std_application_pass: true,
					std_application_submit: true,
					stf_application_allow_confirm: true,
				},
			});

			if (!studentApplication) {
				return new ForbiddenException();
			}

			const updateComfirmation = await this.prisma.studentApplication.update({
				where: {
					std_user_id: userId,
					std_application_id: applicationConfirmation.application_id,
					stf_application_allow_confirm: true,
				},
				data: {
					std_application_abort_reason: applicationConfirmation.reason,
					std_application_confirm: applicationConfirmation.confirm,
				},
				select: {
					std_application_pass: true,
					std_application_abort_reason: true,
					std_application_confirm: true,
					std_application_submit: true,
					created_at: true,
					updated_at: true,
				},
			});

			return updateComfirmation;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
