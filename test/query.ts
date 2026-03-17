import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "generated/prisma/client";
import { config } from "src/config/app.config";

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
		const getAllApp = await this.prisma.applicationInfo.findMany({
			where: {
				std_info_education_level: {
					not: null,
				},
			},
		});

		console.log(new Set(getAllApp.map((q) => decodeURI(q.std_info?.std_info_education_level || ""))));
	}
}

const prismaQuery = new PrismaQuery();
prismaQuery.run();
