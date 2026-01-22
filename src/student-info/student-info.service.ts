import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from "@nestjs/common";
import type { UserSession } from "@thallesp/nestjs-better-auth";
import { PrismaService } from "src/prisma/prisma.service";
import { StatusUpdateService } from "src/status-update/status-update.service";
import { StudentStatusType } from "src/student-status/dto/student-status.dto";
import { StudentInfoDto } from "./dto/student-info.dto";

@Injectable()
export class StudentInfoService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly statusUpdateService: StatusUpdateService,
	) {}

	async updateStudentInfo(studentInfoDto: StudentInfoDto, userId: string) {
		try {
			const studentInfo = await this.prisma.studentInfo.findUnique({
				where: {
					std_user_id: userId,
				},
			});

			if (!studentInfo) {
				await this.prisma.studentInfo.create({
					data: {
						std_user_id: userId,
					},
				});
			}

			// update student info
			const updateStudentInfo = await this.prisma.studentInfo.update({
				where: {
					std_user_id: userId,
				},
				data: {
					std_user_prefix: encodeURI("asd"),
				},
			});

			await this.statusUpdateService.update(userId, StudentStatusType.INFO_DONE, true);

			return updateStudentInfo;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
