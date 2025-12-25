import { PrismaClient } from "generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "src/config/app.config";

const adapter = new PrismaPg({
	connectionString: config.db.url,
});
const prisma = new PrismaClient({ adapter });

class PrismaSeed {
	constructor() {
    this.createAdminRole()
    this.disconnect();

	}

	async createAdminRole() {
		const cRole = await prisma.staffRoles.create({
			data: {
				stf_role_name: "Admin",
				stf_role_weight: 0,
			},
		});

		console.log(cRole);
	}

	async disconnect() {
		await prisma.$disconnect();
	}
}

new PrismaSeed();
