import { HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { AppInfoGender } from "generated/prisma/enums";
import { LoggerService } from "src/core/logger/logger.service";
import { PrismaService } from "src/core/prisma/prisma.service";
import { EducationLevel } from "./staff-leaderboard.controller";

const educationLevelKey = {
	m4: "มัธยมศึกษาปีที่ 4",
	m5: "มัธยมศึกษาปีที่ 5",
	v1: "ปวช. 1",
	v2: "ปวช. 2",
};

@Injectable()
export class StaffLeaderboardService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly logger: LoggerService,
	) {}

	async getPassApplication(gender: AppInfoGender, level: EducationLevel) {
		try {
			const getTopScore = await this.prisma.studentApplication.findMany({
				where: {
					std_total_score: {
						isNot: null,
					},
					std_info: {
						std_info_gender: gender,
						OR: [
							{
								std_info_education_level: encodeURI(level === EducationLevel.M4 ? educationLevelKey.m4 : educationLevelKey.m5),
							},
							{
								std_info_education_level: encodeURI(level === EducationLevel.M4 ? educationLevelKey.v1 : educationLevelKey.v2),
							},
						],
					},
				},
				orderBy: {
					std_total_score: {
						std_total_score: "desc",
					},
				},
				include: {
					std_total_score: true,
					std_status: true,
					std_info: true,
				},
				skip: 0,
				take: 20,
			});

			return getTopScore;
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}

	async getReserveApplication(gender: AppInfoGender, level: EducationLevel) {
		try {
			const getTopScore = await this.prisma.studentApplication.findMany({
				where: {
					std_total_score: {
						isNot: null,
					},
					std_info: {
						std_info_gender: gender,
						OR: [
							{
								std_info_education_level: encodeURI(level === EducationLevel.M4 ? educationLevelKey.m4 : educationLevelKey.m5),
							},
							{
								std_info_education_level: encodeURI(level === EducationLevel.M4 ? educationLevelKey.v1 : educationLevelKey.v2),
							},
						],
					},
				},
				orderBy: {
					std_total_score: {
						std_total_score: "desc",
					},
				},
				include: {
					std_total_score: true,
					std_status: true,
					std_info: true,
				},
				take: 5,
				skip: 20,
			});

			return getTopScore;
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}
}
