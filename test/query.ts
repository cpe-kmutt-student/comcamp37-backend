import fs from "node:fs";
import path from "node:path";
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
		const getAll = await this.prisma.user.findMany({
			include: {
				sessions: true,
				accounts: true,
				stf_email_history: true,
				stf_regis_question_score: true,
				stf_academic_question_score: true,
				stf_academic_chaos_question_score: true,
				stf_info_check: true,
				stf_ticket_solve: true,
				std_application: {
					include: {
						std_info: true,
						std_file: {
							include: {
								pe_payment_evidence: true,
							},
						},
						std_regis_question: {
							include: {
								stf_regis_question_score: {
									include: {
										stf_user: true,
									},
								},
							},
						},
						std_academic_question: {
							include: {
								stf_academic_question_score: {
									include: {
										stf_user: true,
									},
								},
							},
						},
						std_academic_chaos_question: {
							include: {
								stf_academic_chaos_question_score: {
									include: {
										stf_user: true,
									},
								},
							},
						},
						std_total_score: true,
						std_status: {
							include: {
								stf_info_check: {
									include: {
										stf_user: true,
									},
								},
							},
						},
						pe_payment_evidence: {
							include: {
								std_file: true,
							},
						},
					},
				},
			},
		});

		fs.writeFileSync(path.join(__dirname, "../output.json"), JSON.stringify(getAll, null, 4), "utf8");
	}
}

const prismaQuery = new PrismaQuery();
prismaQuery.run();
