import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "generated/prisma/client";
import { config } from "src/config/app.config";
import { EducationLevel } from "src/modules/staff-leaderboard/staff-leaderboard.controller";

const educationLevelKey = {
	m4: "มัธยมศึกษาปีที่ 4",
	m5: "มัธยมศึกษาปีที่ 5",
	v1: "ปวช. 1",
	v2: "ปวช. 2",
};

class PrismaQuery {
	private readonly adapter: PrismaPg;
	private readonly prisma: PrismaClient;

	constructor() {
		this.adapter = new PrismaPg({
			connectionString: config.db.url,
		});
		this.prisma = new PrismaClient({ adapter: this.adapter });
	}

	async run() {
		const getTopScore = await this.prisma.studentApplication.findMany({
			where: {
				std_total_score: {
					isNot: null,
				},
				std_info: {
					std_info_gender: "female",
					OR: [
						{
							std_info_education_level: encodeURI("m5" === EducationLevel.M5 ? educationLevelKey.m4 : educationLevelKey.m5),
						},
						{
							std_info_education_level: encodeURI("m5" === EducationLevel.M5 ? educationLevelKey.v1 : educationLevelKey.v2),
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
				std_status: {
					include: {
						stf_info_check: {
							include: {
								stf_user: true,
							},
						},
					},
				},
				std_info: true,
			},
			skip: 0,
			take: 20,
		});

		console.log(getTopScore.map((ts) => decodeURI(ts.std_info?.std_info_travel_plan || "")));
	}
}

const prismaQuery = new PrismaQuery();
prismaQuery.run();
