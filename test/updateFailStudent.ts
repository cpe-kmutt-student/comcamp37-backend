import fs from "node:fs";
import path from "node:path";
import { PrismaConnector } from "./PrismaConnector";

class UpdateFailStudent extends PrismaConnector {
	async run1() {
		const findWaitingOrFail = await this.prisma.studentApplication.findMany({
			where: {
				std_application_submit: true,
				std_application_result: "pass",
			},
		});

		let i = 1;
		for (const { std_application_id } of findWaitingOrFail) {
			try {
				await this.prisma.studentApplication.update({
					where: {
						std_application_id: std_application_id,
					},
					data: {
						std_application_pass: true,
					},
				});
				console.log(i++, "Success :", std_application_id);
			} catch (e) {
				console.log("Fail to update :", std_application_id, e);
			}
		}

		console.log(findWaitingOrFail.length);

		await this.prisma.$disconnect();
	}

	async run2() {
		const application = await this.prisma.studentApplication.findMany({
			where: {
				std_application_submit: true,
			},
			orderBy: {
				std_total_score: {
					std_total_score: "desc",
				},
			},
			select: {
				std_info: {
					select: {
						std_info_nick_name: true,
					},
				},
				std_user: {
					select: {
						email: true,
					},
				},
			},
		});

		const submitedEmails = application.map((app) => ({
			email: app.std_user.email,
			name: decodeURI(app.std_info?.std_info_nick_name || ""),
		}));

		const toJson = JSON.stringify(submitedEmails, null, 2);
		fs.writeFileSync(path.join(__dirname, "./emails.json"), toJson, "utf8");
	}
}

const updater = new UpdateFailStudent();
updater.run1();
