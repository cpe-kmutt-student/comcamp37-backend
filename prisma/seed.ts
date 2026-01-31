import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "src/config/app.config";
import { auth } from "src/lib/auth";
import { FileType, PrismaClient, UserRoles } from "../generated/prisma/client";

class PrismaSeed {
	private readonly adapter: PrismaPg;
	private readonly prisma: PrismaClient;

	constructor() {
		this.adapter = new PrismaPg({
			connectionString: config.db.url,
		});
		this.prisma = new PrismaClient({ adapter: this.adapter });
	}
}
