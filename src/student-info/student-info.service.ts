import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
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

	async getFilledHistory(userId: string) {
		try {
			const studentApplication = await this.prisma.studentApplication.findUnique({
				where: {
					std_user_id: userId,
					std_user: {
						role: "user",
					},
				},
			});

			if (!studentApplication) throw new NotFoundException();

			const studentInfo = await this.prisma.studentInfo.findUnique({
				where: {
					std_application_id: studentApplication.std_application_id,
				},
			});

			if (!studentApplication) throw new NotFoundException();

			return studentInfo;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	async updateStudentInfo(userId: string, studentInfoDto: StudentInfoDto) {
		try {
			const studentInfoPlate = {
				std_info_prefix: encodeURI(studentInfoDto.prefix),
				std_info_first_name: encodeURI(studentInfoDto.first_name),
				std_info_last_name: encodeURI(studentInfoDto.last_name),
				std_info_nick_name: encodeURI(studentInfoDto.nick_name),
				std_info_age: studentInfoDto.age,
				std_info_birthdate: encodeURI(studentInfoDto.birthdate),
				std_info_gender: encodeURI(studentInfoDto.gender),
				std_info_religion: encodeURI(studentInfoDto.religion),
				std_info_phone_number: encodeURI(studentInfoDto.phone_number),
				std_info_education_level: encodeURI(studentInfoDto.education_level),
				std_info_education_institute: encodeURI(studentInfoDto.education_institute),
				std_info_education_plan: encodeURI(studentInfoDto.education_plan),
				std_info_parent_fullname: encodeURI(studentInfoDto.parent_fullname),
				std_info_parent_relation: encodeURI(studentInfoDto.parent_relation),
				std_info_parent_phone_number: encodeURI(studentInfoDto.parent_phone_number),
				std_info_have_participated: studentInfoDto.have_participated,
				std_info_have_laptop: studentInfoDto.have_laptop,
				std_info_can_participate_every_day: studentInfoDto.can_participate_every_day,
				std_info_medical_insurance: encodeURI(studentInfoDto.medical_insurance),
				std_info_chronic_disease: encodeURI(studentInfoDto.chronic_disease),
				std_info_drug_allergy: encodeURI(studentInfoDto.drug_allergy),
				std_info_food_allergy: encodeURI(studentInfoDto.food_allergy),
				std_info_blood_group: encodeURI(studentInfoDto.blood_group),
				std_info_address: encodeURI(studentInfoDto.address),
				std_info_shirt_size: encodeURI(studentInfoDto.shirt_size),
				std_info_travel_plan: encodeURI(studentInfoDto.travel_plan),
				std_info_laptop_os: encodeURI(studentInfoDto.laptop_os),
				std_info_have_tablet: studentInfoDto.have_tablet,
				std_info_have_mouse: studentInfoDto.have_mouse,
			};

			const studentApplication = await this.prisma.studentApplication.upsert({
				where: {
					std_user_id: userId,
					std_user: {
						role: "user",
					},
				},
				create: {
					std_user_id: userId,
					...studentInfoPlate,
				},
				update: {
					...studentInfoPlate,
				},
			});

			if (!studentApplication || !studentApplication.std_info) {
				await this.prisma.studentApplication.create({
					data: {
						std_user_id: userId,
					},
				});
			}

			if (!studentApplication.std_info) {
				await this.prisma.studentInfo.create({
					data: {
						std_application_id: studentApplication.std_application_id,
					},
				});
			}

			await this.prisma.studentInfo.update({
				where: {
					std_application_id: studentApplication.std_application_id,
				},
				data: {},
			});

			await this.prisma.applicationStatus.up;
		} catch (e) {
			throw new InternalServerErrorException();
		}

		// try {
		// 	const studentInfo = await this.prisma.studentInfo.findUnique({
		// 		where: {
		// 			std_user_id: userId,
		// 		},
		// 	});
		// 	if (!studentInfo) {
		// 		await this.prisma.studentInfo.create({
		// 			data: {
		// 				std_user_id: userId,
		// 			},
		// 		});
		// 	}
		// 	// update student info
		// 	const updateStudentInfo = await this.prisma.studentInfo.update({
		// 		where: {
		// 			std_user_id: userId,
		// 		},
		// 		data: {
		// 			std_info_prefix: encodeURI(studentInfoDto.prefix),
		// 			std_info_first_name: encodeURI(studentInfoDto.first_name),
		// 			std_info_last_name: encodeURI(studentInfoDto.last_name),
		// 			std_info_nick_name: encodeURI(studentInfoDto.nick_name),
		// 			std_info_age: studentInfoDto.age,
		// 			std_info_birthdate: encodeURI(studentInfoDto.birthdate),
		// 			std_info_gender: encodeURI(studentInfoDto.gender),
		// 			std_info_religion: encodeURI(studentInfoDto.religion),
		// 			std_info_phone_number: encodeURI(studentInfoDto.phone_number),
		// 			std_info_education_level: encodeURI(studentInfoDto.education_level),
		// 			std_info_education_institute: encodeURI(studentInfoDto.education_institute),
		// 			std_info_education_plan: encodeURI(studentInfoDto.education_plan),
		// 			std_info_parent_fullname: encodeURI(studentInfoDto.parent_fullname),
		// 			std_info_parent_relation: encodeURI(studentInfoDto.parent_relation),
		// 			std_info_parent_phone_number: encodeURI(studentInfoDto.parent_phone_number),
		// 			std_info_have_participated: studentInfoDto.have_participated,
		// 			std_info_have_laptop: studentInfoDto.have_laptop,
		// 			std_info_can_participate_every_day: studentInfoDto.can_participate_every_day,
		// 			std_info_medical_insurance: encodeURI(studentInfoDto.medical_insurance),
		// 			std_info_chronic_disease: encodeURI(studentInfoDto.chronic_disease),
		// 			std_info_drug_allergy: encodeURI(studentInfoDto.drug_allergy),
		// 			std_info_food_allergy: encodeURI(studentInfoDto.food_allergy),
		// 			std_info_blood_group: encodeURI(studentInfoDto.blood_group),
		// 			std_info_address: encodeURI(studentInfoDto.address),
		// 			std_info_shirt_size: encodeURI(studentInfoDto.shirt_size),
		// 			std_info_travel_plan: encodeURI(studentInfoDto.travel_plan),
		// 			std_info_laptop_os: encodeURI(studentInfoDto.laptop_os),
		// 			std_info_have_tablet: studentInfoDto.have_tablet,
		// 			std_info_have_mouse: studentInfoDto.have_mouse,
		// 		},
		// 	});
		// 	await this.statusUpdateService.update(userId, StudentStatusType.INFO_DONE, true);
		// 	return updateStudentInfo;
		// } catch (e) {
		// 	throw new InternalServerErrorException();
		// }
	}
}
