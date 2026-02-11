import { ForbiddenException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
export class ApplicationSubmitService {
	constructor(private readonly prisma: PrismaService) {}

	async applicationSubmit(userId: string, appId: string) {
		try {
			const applicationStatus = await this.prisma.studentApplication.findUnique({
				where: {
					std_user_id: userId,
					std_application_id: appId,
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
					std_application_id: appId,
				},
				data: {
					std_application_submit: true,
				},
			});

			return updateSubmitStatus;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
