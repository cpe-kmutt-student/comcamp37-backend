import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, UserRoles } from "generated/prisma/client";
import { config } from "src/config/app.config";

const adapter = new PrismaPg({
	connectionString: config.db.url,
});

const prisma = new PrismaClient({ adapter });

async function main() {
	console.log("🚀 Prisma seed started");

	/* ======================
	 * USERS
	 * ====================== */
	console.log("👤 Seeding users...");

	const admin = await prisma.user.upsert({
		where: { email: "admin@example.com" },
		update: {},
		create: {
			id: "admin-1",
			name: "Admin User",
			email: "admin@example.com",
			role: UserRoles.admin,
			emailVerified: true,
		},
	});
	console.log("✅ Admin user:", admin.id);

	const staff = await prisma.user.upsert({
		where: { email: "staff@example.com" },
		update: {},
		create: {
			id: "staff-1",
			name: "Staff User",
			email: "staff@example.com",
			role: UserRoles.staff,
			emailVerified: true,
		},
	});
	console.log("✅ Staff user:", staff.id);

	const user = await prisma.user.upsert({
		where: { email: "student@example.com" },
		update: {},
		create: {
			id: "user-1",
			name: "Student One",
			email: "student@example.com",
			role: UserRoles.user,
			emailVerified: true,
		},
	});
	console.log("✅ Student user:", user.id);

	/* ======================
	 * STUDENT APPLICATION
	 * ====================== */
	console.log("📝 Creating student application...");

	const application = await prisma.studentApplication.create({
		data: {
			std_user_id: user.id,
			std_application_submit: true,
			std_application_confirm: true,

			std_info: {
				create: {
					std_info_prefix: "Mr.",
					std_info_first_name: "John",
					std_info_last_name: "Doe",
					std_info_nick_name: "JD",
					std_info_age: 18,
					std_info_gender: "male",
					std_info_phone_number: "0812345678",
					std_info_have_laptop: true,
					std_info_can_participate_every_day: true,
					std_info_shirt_size: "L",
					std_info_address: "Bangkok, Thailand",
				},
			},

			std_status: {
				create: {
					std_status_info_done: true,
					std_status_file_done: true,
					std_status_regis_question_done: true,
					std_status_acdemic_question_done: false,
					std_status_paid: false,
				},
			},
		},
	});

	console.log("✅ Application created:", application.std_application_id);

	/* ======================
	 * REGISTRATION QUESTIONS
	 * ====================== */
	console.log("📋 Creating registration question answer...");

	const regisAnswer = await prisma.studentRegisQuestionAnswer.create({
		data: {
			std_application_id: application.std_application_id,
			std_regis_answer_section: "motivation",
			std_regis_answer: "I want to join because I love programming.",
		},
	});

	console.log("✅ Regis answer ID:", regisAnswer.std_regis_answer_id);

	console.log("⭐ Scoring registration answer...");

	const regisScore = await prisma.staffRegisQuestionScore.create({
		data: {
			std_regis_answer_id: regisAnswer.std_regis_answer_id,
			stf_count: 1,
			stf_score: 4.5,
			stf_user_id: staff.id,
		},
	});

	console.log("✅ Regis score ID:", regisScore.id);

	/* ======================
	 * ACADEMIC QUESTIONS
	 * ====================== */
	console.log("📚 Creating academic question answer...");

	const academicAnswer = await prisma.studentAcademicQuestionAnswer.create({
		data: {
			std_application_id: application.std_application_id,
			std_academic_answer_section: "logic",
			std_academic_answer: "Because the time complexity is O(n log n).",
		},
	});

	console.log("✅ Academic answer ID:", academicAnswer.std_academic_answer_id);

	console.log("⭐ Scoring academic answer...");

	const academicScore = await prisma.staffAcademicQuestionScore.create({
		data: {
			std_academic_answer_id: academicAnswer.std_academic_answer_id,
			stf_count: 1,
			stf_score: 4.0,
			stf_user_id: staff.id,
		},
	});

	console.log("✅ Academic score ID:", academicScore.id);

	console.log("🎉 Prisma seed finished successfully");
}

main()
	.catch((err) => {
		console.error("❌ Prisma seed failed");
		console.error(err);
		process.exit(1);
	})
	.finally(async () => {
		console.log("🔌 Disconnecting Prisma...");
		await prisma.$disconnect();
	});
