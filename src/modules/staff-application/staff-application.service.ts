import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
export class StaffApplicationService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll(appId?: string) {
		try {
			const allApplications = await this.prisma.studentApplication.findMany({
				where: {
					std_application_id: appId,
					std_application_submit: true,
					std_status: {
						std_status_info_done: true,
					},
				},
				include: {
					std_user: true,
					std_info: true,
					std_file: true,
					std_regis_question: {
						include: {
							stf_regis_question_score: {
								include: {
									stf_user: true,
								},
							},
						},
					},
					std_academic_question: {
						include: {
							stf_academic_question_score: {
								include: {
									stf_user: true,
								},
							},
						},
					},
					std_status: true,
				},
			});

			return allApplications;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	async getByAppId(appId: string) {
		const apps = await this.getAll(appId);
		return apps.length !== 0 ? apps[0] : new NotFoundException();
	}
}
