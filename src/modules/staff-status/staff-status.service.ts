import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { LoggerService } from "src/core/logger/logger.service";
import { PrismaService } from "src/core/prisma/prisma.service";
import { AllowToConfirmDto, AppStatusCommentDto, AppStatusInfoCheckDto, ChangeResultDto } from "./dto/staff-status.dto";

@Injectable()
export class StaffStatusService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly logger: LoggerService,
	) {}

	async getStatusById(appId: string) {
		try {
			const appStatus = await this.prisma.applicationStatus.findUnique({
				where: {
					std_application_id: appId,
				},
			});

			return appStatus;
		} catch (e) {
			this.logger.error(e);
			throw new InternalServerErrorException();
		}
	}

	async appInfoCheck(stfUserId: string, appStatusInfoCheckDto: AppStatusInfoCheckDto) {
		try {
			const updateStatus = await this.prisma.applicationInfoCheck.upsert({
				where: {
					std_application_id: appStatusInfoCheckDto.application_id,
				},
				create: {
					std_application_id: appStatusInfoCheckDto.application_id,
					stf_user_id: stfUserId,
					std_info_status: appStatusInfoCheckDto.status,
				},
				update: {
					stf_user_id: stfUserId,
					std_info_status: appStatusInfoCheckDto.status,
				},
			});

			return updateStatus;
		} catch (e) {
			this.logger.error(e);
			throw new InternalServerErrorException();
		}
	}

	async appInfoComment(appId: string, appStatusInfoCommentDto: AppStatusCommentDto) {
		try {
			const updateStatus = await this.prisma.applicationStatus.update({
				where: {
					std_application_id: appId,
				},
				data: {
					std_info_note: appStatusInfoCommentDto.comment,
				},
			});

			return updateStatus;
		} catch (e) {
			this.logger.error(e);
			throw new InternalServerErrorException();
		}
	}

	async allowToConfirm(allowToConfirmDto: AllowToConfirmDto) {
		try {
			if (!allowToConfirmDto.confirm) throw new BadRequestException("Need to recieve confirm boolean");

			const findApplication = await this.prisma.studentApplication.findUnique({
				where: {
					std_application_id: allowToConfirmDto.application_id,
				},
			});
			if (!findApplication) throw new NotFoundException();

			const updatePermission = await this.prisma.studentApplication.update({
				where: {
					std_application_id: allowToConfirmDto.application_id,
				},
				data: {
					stf_application_allow_confirm: true,
				},
			});

			return updatePermission;
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}

	async changeResult(changeResultDto: ChangeResultDto) {
		try {
			const findApplication = await this.prisma.studentApplication.findUnique({
				where: {
					std_application_id: changeResultDto.application_id,
				},
			});

			if (!findApplication) throw new NotFoundException();

			const updateResult = await this.prisma.studentApplication.update({
				where: {
					std_application_id: changeResultDto.application_id,
				},
				data: {
					std_application_result: changeResultDto.result,
				},
			});

			return updateResult;
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}
}
