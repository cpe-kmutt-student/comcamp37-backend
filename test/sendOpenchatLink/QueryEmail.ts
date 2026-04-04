import fs from "node:fs";
import path from "node:path";
import { PrismaConnector } from "test/PrismaConnector";

class QueryEmail extends PrismaConnector {
	async run() {
		try {
			const getConfirmedUserEmail = await this.prisma.studentApplication.findMany({
				where: {
					std_application_confirm: true,
				},
				select: {
					std_info: {
						select: {
							std_info_first_name: true,
							std_info_last_name: true,
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

			const mapedObj = getConfirmedUserEmail.map((user) => {
				return {
					email: user.std_user.email,
					firstname: decodeURI(user.std_info?.std_info_first_name || ""),
					lastname: decodeURI(user.std_info?.std_info_last_name || ""),
					nickname: decodeURI(user.std_info?.std_info_nick_name || ""),
				};
			});

			const toJson = JSON.stringify(mapedObj, null, 2);

			fs.writeFileSync(path.join(__dirname, "./confirmed-emails.json"), toJson, "utf8");
			console.log(mapedObj.length);
		} catch (e) {
			console.error(e);
		}
	}
}

new QueryEmail().run();
