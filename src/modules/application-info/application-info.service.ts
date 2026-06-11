import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { LoggerService } from "src/core/logger/logger.service";
import { PrismaService } from "src/core/prisma/prisma.service";
import { StatusUpdaterService } from "../status-updater/status-updater.service";
import { ApplicationInfoDto } from "./dto/application-info.dto";

@Injectable()
export class ApplicationInfoService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly statusUpdaterService: StatusUpdaterService,
		private readonly logger: LoggerService,
	) {}

	async getApplicationInfo(userId: string, appId: string) {
		try {
			const applicationInfo = await this.prisma.applicationInfo.findUnique({
				where: {
					std_application_id: appId,
					std_application: {
						std_user_id: userId,
					},
				},
			});

			if (!applicationInfo) throw new NotFoundException();

			return applicationInfo;
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}

	async updateApplicationInfo(userId: string, appId: string, applicationInfoDto: ApplicationInfoDto) {
		try {
			const applicationInfo = await this.prisma.applicationInfo.update({
				where: {
					std_application_id: appId,
					std_application: {
						std_user_id: userId,
					},
				},
				data: {
					std_info_prefix: encodeURI(applicationInfoDto.prefix),
					std_info_first_name: encodeURI(applicationInfoDto.first_name),
					std_info_last_name: encodeURI(applicationInfoDto.last_name),
					std_info_nick_name: encodeURI(applicationInfoDto.nick_name),
					std_info_age: applicationInfoDto.age,
					std_info_birthdate: encodeURI(applicationInfoDto.birthdate),
					std_info_gender: applicationInfoDto.gender,
					std_info_sexuality: encodeURI(applicationInfoDto.sexuality || ""),
					std_info_religion: encodeURI(applicationInfoDto.religion),
					std_info_phone_number: encodeURI(applicationInfoDto.phone_number),
					std_info_education_level: encodeURI(applicationInfoDto.education_level),
					std_info_education_institute: encodeURI(applicationInfoDto.education_institute),
					std_info_education_plan: encodeURI(applicationInfoDto.education_plan),
					std_info_grade_gpax: applicationInfoDto.grade_gpax,
					std_info_grade_math: applicationInfoDto.grade_math,
					std_info_grade_sci: applicationInfoDto.grade_sci,
					std_info_grade_eng: applicationInfoDto.grade_eng,
					std_info_parent_fullname: encodeURI(applicationInfoDto.parent_fullname),
					std_info_parent_relation: encodeURI(applicationInfoDto.parent_relation),
					std_info_parent_phone_number: encodeURI(applicationInfoDto.parent_phone_number),
					std_info_have_participated: applicationInfoDto.have_participated,
					std_info_have_laptop: applicationInfoDto.have_laptop,
					std_info_can_participate_every_day: applicationInfoDto.can_participate_every_day,
					std_info_medical_insurance: encodeURI(applicationInfoDto.medical_insurance),
					std_info_chronic_disease: encodeURI(applicationInfoDto.chronic_disease),
					std_info_drug_allergy: encodeURI(applicationInfoDto.drug_allergy),
					std_info_food_allergy: encodeURI(applicationInfoDto.food_allergy),
					std_info_blood_group: encodeURI(applicationInfoDto.blood_group),
					std_info_address: encodeURI(applicationInfoDto.address),
					std_info_shirt_size: encodeURI(applicationInfoDto.shirt_size),
					std_info_travel_plan: encodeURI(applicationInfoDto.travel_plan),
					std_info_laptop_os: encodeURI(applicationInfoDto.laptop_os),
					std_info_have_tablet: applicationInfoDto.have_tablet,
					std_info_have_mouse: applicationInfoDto.have_mouse,
				},
			});

			await this.statusUpdaterService.infoDoneUpdater(appId);

			return {
				application_id: applicationInfo.std_application_id,
				prefix: this.decode(applicationInfo.std_info_prefix),
				first_name: this.decode(applicationInfo.std_info_first_name),
				last_name: this.decode(applicationInfo.std_info_last_name),
				nick_name: this.decode(applicationInfo.std_info_nick_name),
				age: applicationInfo.std_info_age,
				birthdate: this.decode(applicationInfo.std_info_birthdate),
				gender: applicationInfo.std_info_gender,
				sexuality: this.decode(applicationInfo.std_info_sexuality),
				religion: this.decode(applicationInfo.std_info_religion),
				phone_number: this.decode(applicationInfo.std_info_phone_number),
				education_level: this.decode(applicationInfo.std_info_education_level),
				education_institute: this.decode(applicationInfo.std_info_education_institute),
				education_plan: this.decode(applicationInfo.std_info_education_plan),
				grade_gpax: applicationInfo.std_info_grade_gpax,
				grade_math: applicationInfo.std_info_grade_math,
				grade_sci: applicationInfo.std_info_grade_sci,
				grade_eng: applicationInfo.std_info_grade_eng,
				parent_fullname: this.decode(applicationInfo.std_info_parent_fullname),
				parent_relation: this.decode(applicationInfo.std_info_parent_relation),
				parent_phone_number: this.decode(applicationInfo.std_info_parent_phone_number),
				have_participated: applicationInfo.std_info_have_participated,
				have_laptop: applicationInfo.std_info_have_laptop,
				can_participate_every_day: applicationInfo.std_info_can_participate_every_day,
				medical_insurance: this.decode(applicationInfo.std_info_medical_insurance),
				chronic_disease: this.decode(applicationInfo.std_info_chronic_disease),
				drug_allergy: this.decode(applicationInfo.std_info_drug_allergy),
				food_allergy: this.decode(applicationInfo.std_info_food_allergy),
				blood_group: this.decode(applicationInfo.std_info_blood_group),
				address: this.decode(applicationInfo.std_info_address),
				shirt_size: this.decode(applicationInfo.std_info_shirt_size),
				travel_plan: this.decode(applicationInfo.std_info_travel_plan),
				laptop_os: this.decode(applicationInfo.std_info_laptop_os),
				have_tablet: applicationInfo.std_info_have_tablet,
				have_mouse: applicationInfo.std_info_have_mouse,
				created_at: applicationInfo.created_at,
				updated_at: applicationInfo.updated_at,
			};
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}

	decode(txt: string | null): string | null {
		return txt ? decodeURI(txt) : null;
	}
}
