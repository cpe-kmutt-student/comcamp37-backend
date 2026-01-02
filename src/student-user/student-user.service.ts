import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class StudentUserService {
	constructor(private readonly prisma: PrismaService) {}

	async getStudentProfile() {
        
		// return "asd";
		// const getBasicInfo = this.prisma.studentUsers.findUnique({
		//     // where: {
		//         // std_user_id:
		//     // }
		// });
		// return awa
	}
}
