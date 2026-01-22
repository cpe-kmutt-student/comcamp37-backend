import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { StaffStudentInfoEditDto } from "./dto/staff-student-user.dto";

@Injectable()
export class StaffStudentUserService {
	constructor(private readonly prisma: PrismaService) {}

	async getStudentAll() {
		return await this.prisma.user.findMany({
			where: {
				role: "user",
			},
			include: {
				user_info: true,
				user_file: true,
				user_question: true,
				user_status: true,
			},
		});
	}

	async getStudentById(stdId: string) {
		return await this.prisma.user.findUnique({
			where: {
				id: stdId,
				role: "user",
			},
			include: {
				user_info: true,
				user_file: true,
				user_question: true,
				user_status: true,
			},
		});
	}

	async studentInfoEdit(staffStudentInfoEditDto: StaffStudentInfoEditDto) {
		try {
			const studentInfo = await this.prisma.studentInfo.findUnique({
				where: {
					std_user_id: staffStudentInfoEditDto.id,
					std_user: {
						role: "user",
					},
				},
			});

			if (!studentInfo) {
				return new NotFoundException().getResponse();
			}

			return await this.prisma.studentInfo.update({
				where: {
					std_user_id: staffStudentInfoEditDto.id,
					std_user: {
						role: "user",
					},
				},
				data: {
					std_info_nick_name: staffStudentInfoEditDto.nick_name,
					std_info_first_name: staffStudentInfoEditDto.first_name,
					std_info_last_name: staffStudentInfoEditDto.last_name,
					std_info_age: staffStudentInfoEditDto.age,
					std_info_gender: staffStudentInfoEditDto.gender,
					std_info_religion: staffStudentInfoEditDto.religion,
					std_info_blood_group: staffStudentInfoEditDto.blood_group,
					std_info_education_level: staffStudentInfoEditDto.education_level,
					std_info_education_plan: staffStudentInfoEditDto.education_plan,
					std_info_phone_number: staffStudentInfoEditDto.phone_number,
					std_info_medical_insurance: staffStudentInfoEditDto.medical_insurance,
					std_info_chronic_disease: staffStudentInfoEditDto.chronic_disease,
					std_info_drug_allergy: staffStudentInfoEditDto.drug_allergy,
					std_info_food_allergy: staffStudentInfoEditDto.food_allergy,
					std_info_address: staffStudentInfoEditDto.address,
					std_info_have_participated: staffStudentInfoEditDto.have_participated,
					std_info_shirt_size: staffStudentInfoEditDto.shirt_size,
					std_info_have_laptop: staffStudentInfoEditDto.have_laptop,
					std_info_travel_plan: staffStudentInfoEditDto.travel_plan,
					std_info_parent_fullname: staffStudentInfoEditDto.parent_fullname,
					std_info_parent_relation: staffStudentInfoEditDto.parent_relation,
					std_info_parent_phone_number: staffStudentInfoEditDto.parent_phone_number,
					std_info_can_participate_every_day: staffStudentInfoEditDto.can_participate_every_day,
				},
			});
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
