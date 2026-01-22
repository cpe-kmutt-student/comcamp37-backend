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
					std_info_prefix: encodeURI(staffStudentInfoEditDto.prefix),
					std_info_first_name: encodeURI(staffStudentInfoEditDto.first_name),
					std_info_last_name: encodeURI(staffStudentInfoEditDto.last_name),
					std_info_nick_name: encodeURI(staffStudentInfoEditDto.nick_name),
					std_info_age: staffStudentInfoEditDto.age,
					std_info_birthdate: encodeURI(staffStudentInfoEditDto.birthdate),
					std_info_gender: encodeURI(staffStudentInfoEditDto.gender),
					std_info_religion: encodeURI(staffStudentInfoEditDto.religion),
					std_info_phone_number: encodeURI(staffStudentInfoEditDto.phone_number),
					std_info_education_level: encodeURI(staffStudentInfoEditDto.education_level),
					std_info_education_institute: encodeURI(staffStudentInfoEditDto.education_institute),
					std_info_education_plan: encodeURI(staffStudentInfoEditDto.education_plan),
					std_info_parent_fullname: encodeURI(staffStudentInfoEditDto.parent_fullname),
					std_info_parent_relation: encodeURI(staffStudentInfoEditDto.parent_relation),
					std_info_parent_phone_number: encodeURI(staffStudentInfoEditDto.parent_phone_number),
					std_info_have_participated: staffStudentInfoEditDto.have_participated,
					std_info_have_laptop: staffStudentInfoEditDto.have_laptop,
					std_info_can_participate_every_day: staffStudentInfoEditDto.can_participate_every_day,
					std_info_medical_insurance: encodeURI(staffStudentInfoEditDto.medical_insurance),
					std_info_chronic_disease: encodeURI(staffStudentInfoEditDto.chronic_disease),
					std_info_drug_allergy: encodeURI(staffStudentInfoEditDto.drug_allergy),
					std_info_food_allergy: encodeURI(staffStudentInfoEditDto.food_allergy),
					std_info_blood_group: encodeURI(staffStudentInfoEditDto.blood_group),
					std_info_address: encodeURI(staffStudentInfoEditDto.address),
					std_info_shirt_size: encodeURI(staffStudentInfoEditDto.shirt_size),
					std_info_travel_plan: encodeURI(staffStudentInfoEditDto.travel_plan),
					std_info_laptop_os: encodeURI(staffStudentInfoEditDto.laptop_os),
					std_info_have_tablet: staffStudentInfoEditDto.have_tablet,
					std_info_have_mouse: staffStudentInfoEditDto.have_mouse,
				},
			});
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
