import { PrismaConnector } from "test/PrismaConnector";

class UpdateAcademicScore extends PrismaConnector {
	async run() {
		const getConfirmed = await this.prisma.studentApplication.findMany({
			where: {
				std_application_confirm: true,
			},
			select: {
				std_application_id: true,
			},
		});

		// const updateScore = await
	}
}

new UpdateAcademicScore().run();
