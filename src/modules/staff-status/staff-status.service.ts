import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { AppStatusCommentDto, AppStatusInfoCheckDto } from "./dto/staff-status.dto";

@Injectable()
export class StaffStatusService {
	constructor(private readonly prisma: PrismaService) {}

	async getStatusById(appId: string) {
		try {
			const appStatus = await this.prisma.applicationStatus.findUnique({
				where: {
					std_application_id: appId,
				},
			});

			return appStatus;
		} catch (e) {
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
			throw new InternalServerErrorException();
		}
	}
}
