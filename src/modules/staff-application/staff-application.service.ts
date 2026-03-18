import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Prisma } from "generated/prisma/client";
import { LoggerService } from "src/core/logger/logger.service";
import { PrismaService } from "src/core/prisma/prisma.service";
import { StaffApplicationNoteDto, StaffCheckApplicationDto } from "./dto/staff-application.dto";

@Injectable()
export class StaffApplicationService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly logger: LoggerService,
	) {}

	async getAll(appId?: string) {
		try {
			const allApplications = await this.prisma.studentApplication.findMany({
				where: {
					std_application_id: appId,
					std_application_submit: true,
					std_status: {
						std_status_info_done: true,
					},
					std_file: {
						every: {
							std_file_disabled: false,
						},
					},
				},
				include: {
					std_user: true,
					std_info: true,
					std_file: true,
					std_regis_question: {
						include: {
							stf_regis_question_score: {
								include: {
									stf_user: true,
								},
							},
						},
					},
					std_academic_question: {
						include: {
							stf_academic_question_score: {
								include: {
									stf_user: true,
								},
							},
						},
					},
					std_academic_chaos_question: {
						include: {
							stf_academic_chaos_question_score: {
								include: {
									stf_user: true,
								},
							},
						},
					},
					std_status: {
						include: {
							stf_info_check: {
								include: {
									stf_user: true,
								},
							},
						},
					},
				},
			});

			return allApplications;
		} catch (e) {
			this.logger.error(e);
			throw new InternalServerErrorException();
		}
	}

	async getByAppId(appId: string) {
		const apps = await this.getAll(appId);
		return apps.length !== 0 ? apps[0] : new NotFoundException();
	}

	async checkApplication(staffId: string, staffCheckApplicationDto: StaffCheckApplicationDto) {
		try {
			const appStatus = await this.prisma.applicationStatus.findUnique({
				where: {
					std_application_id: staffCheckApplicationDto.app_id,
				},
			});
			if (!appStatus) throw new NotFoundException();

			const updateAppInfoCheck = await this.prisma.applicationInfoCheck.upsert({
				where: {
					std_application_id: staffCheckApplicationDto.app_id,
				},
				create: {
					std_application_id: staffCheckApplicationDto.app_id,
					stf_user_id: staffId,
					std_info_status: staffCheckApplicationDto.app_status,
				},
				update: {
					stf_user_id: staffId,
					std_info_status: staffCheckApplicationDto.app_status,
				},
				include: {
					stf_user: true,
					std_application: true,
				},
			});

			return updateAppInfoCheck;
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) throw e;
			throw new InternalServerErrorException("Unexpected server error");
		}
	}

	async addApplicationNote(staffApplicationNoteDto: StaffApplicationNoteDto) {
		try {
			const updateApplicationNote = await this.prisma.applicationStatus.update({
				where: {
					std_application_id: staffApplicationNoteDto.app_id,
				},
				data: {
					std_info_note: staffApplicationNoteDto.is_note ? staffApplicationNoteDto.app_note : null,
				},
			});

			return updateApplicationNote;
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) throw e;
			throw new InternalServerErrorException("Unexpected server error");
		}
	}
}
