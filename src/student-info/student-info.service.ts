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
			await this.prisma.studentInfo.update({
				where: {
					std_user_id: userId,
				},
				data: {
					std_user_nick_name: encodeURI(studentInfoDto.nickname),
					std_user_first_name: encodeURI(studentInfoDto.firstname),
					std_user_last_name: encodeURI(studentInfoDto.lastname),
					std_info_age: studentInfoDto.age,
					std_info_gender: encodeURI(studentInfoDto.gender),
					std_info_religion: encodeURI(studentInfoDto.religion),
					std_info_blood_group: encodeURI(studentInfoDto.blood_group),
					std_info_education_level: encodeURI(studentInfoDto.education_level),
					std_info_education_plan: encodeURI(studentInfoDto.education_plan),
					std_info_phone: studentInfoDto.phone_number,
					std_info_alternative_email: studentInfoDto.alternative_email,
					std_info_medical_insurance: encodeURI(studentInfoDto.medical_insurance),
					std_info_chronic_disease: encodeURI(studentInfoDto.chronic_disease),
					std_info_drug_allergy: encodeURI(studentInfoDto.drug_allergy),
					std_info_food_allergy: encodeURI(studentInfoDto.food_allergy),
					std_info_address: encodeURI(studentInfoDto.address),
					std_info_home_phone: studentInfoDto.home_phone_number,
					std_info_have_participated: studentInfoDto.have_participated,
					std_info_shirt_size: encodeURI(studentInfoDto.shirt_size),
					std_info_have_laptop: studentInfoDto.have_laptop,
					std_info_travel_plan: encodeURI(studentInfoDto.travel_plan),
					std_info_parent_name: encodeURI(studentInfoDto.parent_fullname),
					std_info_parent_relation: encodeURI(studentInfoDto.parent_relation),
					std_info_parent_phone: studentInfoDto.parent_phone,
					std_info_food_prefer: encodeURI(studentInfoDto.food_prefer),
					std_info_can_participate_every_day: studentInfoDto.can_participate_every_day,
				},
			});

			await this.statusUpdateService.update(userId, StudentStatusType.INFO_DONE, true);

			return {
				status: "OK",
			};
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
