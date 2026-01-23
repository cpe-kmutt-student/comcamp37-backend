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
					std_info_prefix: staffStudentInfoEditDto.prefix ? encodeURI(staffStudentInfoEditDto.prefix) : undefined,
					std_info_first_name: staffStudentInfoEditDto.first_name ? encodeURI(staffStudentInfoEditDto.first_name) : undefined,
					std_info_last_name: staffStudentInfoEditDto.last_name ? encodeURI(staffStudentInfoEditDto.last_name) : undefined,
					std_info_nick_name: staffStudentInfoEditDto.nick_name ? encodeURI(staffStudentInfoEditDto.nick_name) : undefined,
					std_info_age: staffStudentInfoEditDto.age,
					std_info_birthdate: staffStudentInfoEditDto.birthdate ? encodeURI(staffStudentInfoEditDto.birthdate) : undefined,
					std_info_gender: staffStudentInfoEditDto.gender ? encodeURI(staffStudentInfoEditDto.gender) : undefined,
					std_info_religion: staffStudentInfoEditDto.religion ? encodeURI(staffStudentInfoEditDto.religion) : undefined,
					std_info_phone_number: staffStudentInfoEditDto.phone_number ? encodeURI(staffStudentInfoEditDto.phone_number) : undefined,
					std_info_education_level: staffStudentInfoEditDto.education_level ? encodeURI(staffStudentInfoEditDto.education_level) : undefined,
					std_info_education_institute: staffStudentInfoEditDto.education_institute ? encodeURI(staffStudentInfoEditDto.education_institute) : undefined,
					std_info_education_plan: staffStudentInfoEditDto.education_plan ? encodeURI(staffStudentInfoEditDto.education_plan) : undefined,
					std_info_parent_fullname: staffStudentInfoEditDto.parent_fullname ? encodeURI(staffStudentInfoEditDto.parent_fullname) : undefined,
					std_info_parent_relation: staffStudentInfoEditDto.parent_relation ? encodeURI(staffStudentInfoEditDto.parent_relation) : undefined,
					std_info_parent_phone_number: staffStudentInfoEditDto.parent_phone_number ? encodeURI(staffStudentInfoEditDto.parent_phone_number) : undefined,
					std_info_have_participated: staffStudentInfoEditDto.have_participated,
					std_info_have_laptop: staffStudentInfoEditDto.have_laptop,
					std_info_can_participate_every_day: staffStudentInfoEditDto.can_participate_every_day,
					std_info_medical_insurance: staffStudentInfoEditDto.medical_insurance ? encodeURI(staffStudentInfoEditDto.medical_insurance) : undefined,
					std_info_chronic_disease: staffStudentInfoEditDto.chronic_disease ? encodeURI(staffStudentInfoEditDto.chronic_disease) : undefined,
					std_info_drug_allergy: staffStudentInfoEditDto.drug_allergy ? encodeURI(staffStudentInfoEditDto.drug_allergy) : undefined,
					std_info_food_allergy: staffStudentInfoEditDto.food_allergy ? encodeURI(staffStudentInfoEditDto.food_allergy) : undefined,
					std_info_blood_group: staffStudentInfoEditDto.blood_group ? encodeURI(staffStudentInfoEditDto.blood_group) : undefined,
					std_info_address: staffStudentInfoEditDto.address ? encodeURI(staffStudentInfoEditDto.address) : undefined,
					std_info_shirt_size: staffStudentInfoEditDto.shirt_size ? encodeURI(staffStudentInfoEditDto.shirt_size) : undefined,
					std_info_travel_plan: staffStudentInfoEditDto.travel_plan ? encodeURI(staffStudentInfoEditDto.travel_plan) : undefined,
					std_info_laptop_os: staffStudentInfoEditDto.laptop_os ? encodeURI(staffStudentInfoEditDto.laptop_os) : undefined,
					std_info_have_tablet: staffStudentInfoEditDto.have_tablet,
					std_info_have_mouse: staffStudentInfoEditDto.have_mouse,
				},
			});
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
