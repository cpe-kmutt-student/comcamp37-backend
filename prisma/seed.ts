import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "generated/prisma/client";
import { config } from "src/config/app.config";

const adapter = new PrismaPg({
	connectionString: config.db.url,
});
const prisma = new PrismaClient({ adapter });

class PrismaSeed {
	constructor() {
		this.createAdminRole();
		this.disconnect();
	}

	async createAdminRole() {
		// const cRole = await prisma.staffRoles.createMany({
		// 	data: [
		// 		{
		// 			stf_role_name: "Admin",
		// 			stf_role_weight: 0,
		// 		},
		// 		{
		// 			stf_role_name: "Staff",
		// 			stf_role_weight: 1,
		// 		},
		// 	],
		// });
		// console.log(cRole);
	}

	async disconnect() {
		await prisma.$disconnect();
	}
}

new PrismaSeed();
