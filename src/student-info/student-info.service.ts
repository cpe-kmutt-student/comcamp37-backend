import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { StudentInfoDto } from "./dto/student-info.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { StudentUserId } from "src/types/Student.type";

@Injectable()
export class StudentInfoService {
	constructor(private readonly prisma: PrismaService) {}

	async updateStudentInfo(studentInfoDto: StudentInfoDto, studentUser: StudentUserId) {
		try {
			const studentInfo = await this.prisma.studentInfo.findUnique({
				where: {
					std_user_id: studentUser.std_user_id,
				},
			});

			if (!studentInfo) {
				const createInfo = await this.prisma.studentInfo.create({
					data: {
						std_user_id: studentUser.std_user_id,
						std_user_nick_name: studentInfoDto.nickname,
						std_user_first_name: studentInfoDto.firstname,
						std_user_last_name: studentInfoDto.lastname,
						std_info_age: studentInfoDto.age,
						std_info_gender: studentInfoDto.gender,
						std_info_religion: studentInfoDto.religion,
						std_info_blood_group: studentInfoDto.blood_group,
						std_info_education_level: studentInfoDto.education_level,
						std_info_education_plan: studentInfoDto.education_plan,
						std_info_phone: studentInfoDto.phone_number,
						std_info_alternative_email: studentInfoDto.alternative_email,
						std_info_medical_insurance: studentInfoDto.medical_insurance,
						std_info_chronic_disease: studentInfoDto.chronic_disease,
						std_info_drug_allergy: studentInfoDto.drug_allergy,
						std_info_food_allergy: studentInfoDto.food_allergy,
						std_info_address: studentInfoDto.address,
						std_info_home_phone: studentInfoDto.home_phone_number,
						std_info_have_participated: studentInfoDto.have_participated,
						std_info_shirt_size: studentInfoDto.shirt_size,
						std_info_have_laptop: studentInfoDto.have_laptop,
						std_info_travel_plan: studentInfoDto.travel_plan,
						std_info_parent_name: studentInfoDto.parent_fullname,
						std_info_parent_relation: studentInfoDto.parent_relation,
						std_info_parent_phone: studentInfoDto.parent_phone,
						std_info_food_prefer: studentInfoDto.food_prefer,
						std_info_can_participate_every_day: studentInfoDto.can_participate_every_day,
					},
				});
			}

			const updateInfo = await this.prisma.studentInfo.update({
				where: {
					std_user_id: studentUser.std_user_id,
				},
				data: {
					std_user_nick_name: studentInfoDto.nickname,
					std_user_first_name: studentInfoDto.firstname,
					std_user_last_name: studentInfoDto.lastname,
					std_info_age: studentInfoDto.age,
					std_info_gender: studentInfoDto.gender,
					std_info_religion: studentInfoDto.religion,
					std_info_blood_group: studentInfoDto.blood_group,
					std_info_education_level: studentInfoDto.education_level,
					std_info_education_plan: studentInfoDto.education_plan,
					std_info_phone: studentInfoDto.phone_number,
					std_info_alternative_email: studentInfoDto.alternative_email,
					std_info_medical_insurance: studentInfoDto.medical_insurance,
					std_info_chronic_disease: studentInfoDto.chronic_disease,
					std_info_drug_allergy: studentInfoDto.drug_allergy,
					std_info_food_allergy: studentInfoDto.food_allergy,
					std_info_address: studentInfoDto.address,
					std_info_home_phone: studentInfoDto.home_phone_number,
					std_info_have_participated: studentInfoDto.have_participated,
					std_info_shirt_size: studentInfoDto.shirt_size,
					std_info_have_laptop: studentInfoDto.have_laptop,
					std_info_travel_plan: studentInfoDto.travel_plan,
					std_info_parent_name: studentInfoDto.parent_fullname,
					std_info_parent_relation: studentInfoDto.parent_relation,
					std_info_parent_phone: studentInfoDto.parent_phone,
					std_info_food_prefer: studentInfoDto.food_prefer,
					std_info_can_participate_every_day: studentInfoDto.can_participate_every_day,
				},
			});

			return {
				status: "SUCCESS",
			};
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
