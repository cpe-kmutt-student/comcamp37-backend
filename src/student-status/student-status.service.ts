import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { StudentStatusDto, StudentStatusType } from "./dto/student-status.dto";

@Injectable()
export class StudentStatusService {
	constructor(private readonly prisma: PrismaService) {}

	async getAllStatus(userId: string) {
		// try {
		// 	const studentStatus = await this.prisma.studentStatus.findUnique({
		// 		where: {
		// 			std_user_id: userId,
		// 		},
		// 	});
		// 	return {
		// 		file_done: !!studentStatus?.std_status_file_done,
		// 		info_done: !!studentStatus?.std_status_info_done,
		// 		info_checked: !!studentStatus?.stf_info_checked,
		// 		question_done: !!studentStatus?.std_status_question_done,
		// 		question_checked: !!studentStatus?.stf_q_checked,
		// 		question_result: studentStatus?.stf_q_result ? studentStatus.stf_q_result : null,
		// 		question_resukt_detail: studentStatus?.stf_q_result_detail ? studentStatus.stf_q_result_detail : null,
		// 		updated_at: studentStatus?.updated_at,
		// 	};
		// } catch (e) {
		// 	throw new InternalServerErrorException();
		// }
	}

	async getStatusByStatus(userId: string, status: StudentStatusType) {
		// try {
		// 	const studentStatus = await this.prisma.studentApplication.findUnique({
		// 		where: {
		// 			std_user_id: userId,
		// 		},
		// 		include: {
		// 			std_status: true
		// 		},
		// 		select: {
		// 			std_status: {
		// 				select: {
		// 					std_status_file_done: status === StudentStatusType.FILE_DONE,
		// 					std_status_info_done: status === StudentStatusType.INFO_DONE,
		// 					std_status_regis_question_done: status === StudentStatusType.QUESTION_DONE,
		// 					std_status_academic_question_done: status === StudentStatusType.QUESTION_DONE,
		// 					stf_info_checked: status === StudentStatusType.INFO_CHECKED,
		// 					stf_q_checked: status === StudentStatusType.QUESTION_CHECKED,
		// 					stf_q_result: status === StudentStatusType.QUESTION_RESULT,
		// 					stf_q_result_detail: status === StudentStatusType.QUESTION_RESULT_DETAIL,
		// 				}
		// 			}
		// 		},
		// 	});
		// 	return {
		// 		status: status,
		// 		value:
		// 			studentStatus?.std_status_file_done ||
		// 			studentStatus?.std_status_info_done ||
		// 			studentStatus?.std_status_question_done ||
		// 			studentStatus?.stf_info_checked ||
		// 			studentStatus?.stf_q_checked ||
		// 			studentStatus?.stf_q_result ||
		// 			studentStatus?.stf_q_result_detail ||
		// 			null,
		// 	};
		// } catch (e) {
		// 	throw new InternalServerErrorException();
		// }
	}
}
