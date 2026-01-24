import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "src/config/app.config";
import { auth } from "src/lib/auth";
import { PrismaClient, UserRoles } from "../generated/prisma/client";

/* ======================
 * PRISMA SETUP
 * ====================== */
const adapter = new PrismaPg({
	connectionString: config.db.url,
});

const prisma = new PrismaClient({ adapter });

/* ======================
 * HELPERS
 * ====================== */
async function createUser({ email, username, password, name, role }: { email: string; username: string; password: string; name: string; role: UserRoles }) {
	console.log(`👤 Creating user: ${username}`);

	const result = await auth.api.signUpEmail({
		body: { email, username, password, name },
	});

	if (!result?.user) {
		throw new Error(`Failed to create user: ${username}`);
	}

	await prisma.user.update({
		where: { id: result.user.id },
		data: { role },
	});

	console.log(`✅ User created: ${username}`);
	console.log(`   password: ${password}`);

	return result.user;
}

/* ======================
 * SEED
 * ====================== */
async function main() {
	console.log("🚀 Seed started (ONE application per user)");

	/* ======================
	 * USERS
	 * ====================== */
	const admin = await createUser({
		email: "admin@example.com",
		username: "admin",
		password: "Admin1234!",
		name: "Admin User",
		role: UserRoles.admin,
	});

	const staff = await createUser({
		email: "staff@example.com",
		username: "staff",
		password: "Staff1234!",
		name: "Staff One",
		role: UserRoles.staff,
	});

	const staff2 = await createUser({
		email: "staff2@example.com",
		username: "staff2",
		password: "Staff5678!",
		name: "Staff Two",
		role: UserRoles.staff,
	});

	const student = await createUser({
		email: "student@example.com",
		username: "student",
		password: "Student1234!",
		name: "Student One",
		role: UserRoles.user,
	});

	const student2 = await createUser({
		email: "student2@example.com",
		username: "student2",
		password: "Student5678!",
		name: "Student Two",
		role: UserRoles.user,
	});

	/* ======================
	 * APPLICATION — student (PASS)
	 * ====================== */
	console.log("📝 Creating application (student → PASS)");

	const app1 = await prisma.studentApplication.create({
		data: {
			std_user_id: student.id,
			std_application_submit: true,
			std_application_confirm: true,
			std_application_pass: true,

			std_info: {
				create: {
					std_info_first_name: "John",
					std_info_last_name: "Doe",
					std_info_age: 18,
					std_info_gender: "male",
					std_info_have_laptop: true,
					std_info_can_participate_every_day: true,
					std_info_shirt_size: "L",
					std_info_address: "Bangkok",
				},
			},

			std_status: {
				create: {
					std_status_info_done: true,
					std_status_file_done: true,
					std_status_regis_question_done: true,
					std_status_acdemic_question_done: true,
					std_status_paid: true,
					stf_q_checked: true,
					stf_q_result: 88,
					stf_q_result_detail: "Excellent performance",
				},
			},
		},
	});

	const regis1 = await prisma.studentRegisQuestionAnswer.create({
		data: {
			std_application_id: app1.std_application_id,
			std_regis_answer_section: "motivation",
			std_regis_answer: "I want to become a software engineer.",
		},
	});

	await prisma.staffRegisQuestionScore.createMany({
		data: [
			{
				std_regis_answer_id: regis1.std_regis_answer_id,
				stf_user_id: staff.id,
				stf_count: 1,
				stf_score: 4.5,
			},
			{
				std_regis_answer_id: regis1.std_regis_answer_id,
				stf_user_id: staff2.id,
				stf_count: 2,
				stf_score: 4.0,
			},
		],
	});

	/* ======================
	 * APPLICATION — student2 (INCOMPLETE)
	 * ====================== */
	console.log("📝 Creating application (student2 → INCOMPLETE)");

	const app2 = await prisma.studentApplication.create({
		data: {
			std_user_id: student2.id,
			std_application_submit: true,
			std_application_confirm: false,
			std_application_pass: false,

			std_info: {
				create: {
					std_info_first_name: "Jane",
					std_info_last_name: "Smith",
					std_info_age: 17,
					std_info_gender: "female",
					std_info_have_laptop: false,
					std_info_can_participate_every_day: true,
					std_info_shirt_size: "M",
					std_info_address: "Chiang Mai",
				},
			},

			std_status: {
				create: {
					std_status_info_done: true,
					std_status_file_done: false,
					std_status_regis_question_done: true,
					std_status_acdemic_question_done: false,
					std_status_paid: false,
					stf_q_checked: false,
				},
			},
		},
	});

	const regis2 = await prisma.studentRegisQuestionAnswer.create({
		data: {
			std_application_id: app2.std_application_id,
			std_regis_answer_section: "expectation",
			std_regis_answer: "I want to try something new.",
		},
	});

	await prisma.staffRegisQuestionScore.create({
		data: {
			std_regis_answer_id: regis2.std_regis_answer_id,
			stf_user_id: staff.id,
			stf_count: 1,
			stf_score: 2.5,
		},
	});

	console.log("🎉 Seed completed successfully (no duplicate applications)");
}

/* ======================
 * RUN
 * ====================== */
main()
	.catch((err) => {
		console.error("❌ Seed failed");
		console.error(err);
		process.exit(1);
	})
	.finally(async () => {
		console.log("🔌 Disconnecting Prisma");
		await prisma.$disconnect();
	});
