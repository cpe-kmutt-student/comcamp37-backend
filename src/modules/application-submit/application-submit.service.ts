import { ForbiddenException, Injectable, InternalServerErrorException, NotAcceptableException } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { ApplicationSubmitDto } from "./dto/application-submit.dto";

@Injectable()
export class ApplicationSubmitService {
	constructor(private readonly prisma: PrismaService) {}

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

			return updateSubmitStatus;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
