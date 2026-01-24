import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { StaffStudentQuestionCheckedDto } from "./dto/staff-student-question.dto";

@Injectable()
export class StaffStudentQuestionService {
	constructor(private readonly prisma: PrismaService) {}

	async getStudentAnswer(stdId: string) {
		// return this.prisma.studentQuestions.findUnique({
		// 	where: {
		// 		std_user_id: stdId,
		// 		std_user: {
		// 			role: "user",
		// 		},
		// 	},
		// });
	}

	async studentQuestionChecked(staffStudentQuestionCheckedDto: StaffStudentQuestionCheckedDto) {
		// return this.prisma.studentStatus.update({
		// 	where: {
		// 		std_user_id: staffStudentQuestionCheckedDto.stdId,
		// 	},
		// 	data: {
		// 		stf_q_checked: true,
		// 		stf_q_result: staffStudentQuestionCheckedDto.result,
		// 		stf_q_result_detail: staffStudentQuestionCheckedDto.result_detail,
		// 	},
		// 	select: {
		// 		stf_q_checked: true,
		// 		stf_q_result: true,
		// 		stf_q_result_detail: true,
		// 		updated_at: true,
		// 	},
		// });
	}
}
