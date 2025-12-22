import { Global, Injectable, type OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "src/config/app.config";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	constructor() {
		const pool = new PrismaPg({ connectionString: config.db.url });
		super({ adapter: pool });
	}
	async onModuleInit() {
		// Note: this is optional
		await this.$connect();
	}
}
