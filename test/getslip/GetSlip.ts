import fs from "node:fs";
import path from "node:path";
import { FileType } from "generated/prisma/enums";
import { PrismaConnector } from "test/PrismaConnector";

class GetSlip extends PrismaConnector {
	async run() {
		const getSlip = await this.prisma.studentApplication.findMany({
			where: {
				std_status: {
					std_status_payment_done: true,
				},
				std_application_result: "pass",
				std_application_pass: true,
				std_file: {
					some: {
						pe_payment_evidence: {
							isNot: null,
						},
					},
				},
			},
			include: {
				pe_payment_evidence: true,
				std_info: true,
			},
			orderBy: {
				std_total_score: {
					std_total_score: "desc",
				},
			},
		});

		console.table(getSlip.map((sf) => decodeURI(sf.std_info?.std_info_first_name || "")));

		// fs.writeFileSync(path.join(__dirname, "./result.json"), JSON.stringify(getSlip.filter(f => f.pe_payment_evidence.)), null, 2), "utf8");
	}
}

new GetSlip().run();
