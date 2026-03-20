import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "generated/prisma/client";
import { config } from "src/config/app.config";

export class PrismaConnector {
	private readonly adapter: PrismaPg;
	public readonly prisma: PrismaClient;

	constructor() {
		this.adapter = new PrismaPg({
			connectionString: config.db.url,
		});
		this.prisma = new PrismaClient({ adapter: this.adapter });
	}
}
