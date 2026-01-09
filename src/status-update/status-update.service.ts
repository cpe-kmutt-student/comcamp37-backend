import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { StudentStatusType } from "src/student-status/dto/student-status.dto";

@Injectable()
export class StatusUpdateService {
	constructor(private readonly prisma: PrismaService) {}

	async update(userId: string, status: StudentStatusType, value: string | number | boolean) {
		try {
			const studentStatus = await this.prisma.studentStatus.findUnique({
				where: {
					std_user_id: userId,
				},
			});

			if (!studentStatus) {
				await this.prisma.studentStatus.create({
					data: {
						std_user_id: userId,
					},
				});
			}

			await this.prisma.studentStatus.update({
				where: {
					std_user_id: userId,
				},
				data: {
					std_status_file_done: status === StudentStatusType.FILE_DONE ? Boolean(value) : undefined,
					std_status_info_done: status === StudentStatusType.INFO_DONE ? Boolean(value) : undefined,
					std_status_question_done: status === StudentStatusType.QUESTION_DONE ? Boolean(value) : undefined,
					stf_info_checked: status === StudentStatusType.INFO_CHECKED ? Boolean(value) : undefined,
					stf_q_checked: status === StudentStatusType.QUESTION_CHECKED ? Boolean(value) : undefined,
					stf_q_result: status === StudentStatusType.QUESTION_RESULT ? Number(value) : undefined,
					stf_q_result_detail: status === StudentStatusType.QUESTION_RESULT_DETAIL ? String(value) : undefined,
				},
			});
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
