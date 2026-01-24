import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";
import { config } from "src/config/app.config";
import { PrismaClient, UserRoles } from "../generated/prisma/client";

/* ======================
 * PRISMA SETUP
 * ====================== */
const adapter = new PrismaPg({
	connectionString: config.db.url,
});

const prisma = new PrismaClient({ adapter });

async function hash(password: string) {
	console.log("🔐 Hashing password");
	return bcrypt.hash(password, 10);
}

/* ======================
 * SEED
 * ====================== */
async function main() {
	console.log("🚀 Prisma seed started");

	/* ======================
	 * ADMIN
	 * ====================== */
	console.log("👤 Creating admin user");

	const adminPlain = "Admin1234!";
	const adminHash = await hash(adminPlain);

	const admin = await prisma.user.upsert({
		where: { email: "admin@example.com" },
		update: {},
		create: {
			id: "admin-1",
			name: "Admin User",
			email: "admin@example.com",
			username: "admin",
			displayUsername: "Admin",
			role: UserRoles.admin,
			emailVerified: true,
			accounts: {
				create: {
					id: "admin-account-1",
					providerId: "credentials",
					accountId: "admin",
					password: adminHash,
				},
			},
		},
	});

	console.log("✅ Admin created:", admin.username, adminPlain);

	/* ======================
	 * STAFF #1
	 * ====================== */
	console.log("👤 Creating staff #1");

	const staffPlain = "Staff1234!";
	const staffHash = await hash(staffPlain);

	const staff = await prisma.user.upsert({
		where: { email: "staff@example.com" },
		update: {},
		create: {
			id: "staff-1",
			name: "Staff One",
			email: "staff@example.com",
			username: "staff",
			displayUsername: "Staff",
			role: UserRoles.staff,
			emailVerified: true,
			accounts: {
				create: {
					id: "staff-account-1",
					providerId: "credentials",
					accountId: "staff",
					password: staffHash,
				},
			},
		},
	});

	console.log("✅ Staff #1 created:", staff.username, staffPlain);

	/* ======================
	 * STAFF #2
	 * ====================== */
	console.log("👤 Creating staff #2");

	const staff2Plain = "Staff5678!";
	const staff2Hash = await hash(staff2Plain);

	const staff2 = await prisma.user.upsert({
		where: { email: "staff2@example.com" },
		update: {},
		create: {
			id: "staff-2",
			name: "Staff Two",
			email: "staff2@example.com",
			username: "staff2",
			displayUsername: "Staff Two",
			role: UserRoles.staff,
			emailVerified: true,
			accounts: {
				create: {
					id: "staff2-account-1",
					providerId: "credentials",
					accountId: "staff2",
					password: staff2Hash,
				},
			},
		},
	});

	console.log("✅ Staff #2 created:", staff2.username, staff2Plain);

	/* ======================
	 * STUDENT #1
	 * ====================== */
	console.log("👤 Creating student #1");

	const studentPlain = "Student1234!";
	const studentHash = await hash(studentPlain);

	const student = await prisma.user.upsert({
		where: { email: "student@example.com" },
		update: {},
		create: {
			id: "user-1",
			name: "Student One",
			email: "student@example.com",
			username: "student",
			displayUsername: "Student",
			role: UserRoles.user,
			emailVerified: true,
			accounts: {
				create: {
					id: "student-account-1",
					providerId: "credentials",
					accountId: "student",
					password: studentHash,
				},
			},
		},
	});

	console.log("✅ Student #1 created:", student.username, studentPlain);

	/* ======================
	 * STUDENT #2
	 * ====================== */
	console.log("👤 Creating student #2");

	const student2Plain = "Student5678!";
	const student2Hash = await hash(student2Plain);

	const student2 = await prisma.user.upsert({
		where: { email: "student2@example.com" },
		update: {},
		create: {
			id: "user-2",
			name: "Student Two",
			email: "student2@example.com",
			username: "student2",
			displayUsername: "Student Two",
			role: UserRoles.user,
			emailVerified: true,
			accounts: {
				create: {
					id: "student2-account-1",
					providerId: "credentials",
					accountId: "student2",
					password: student2Hash,
				},
			},
		},
	});

	console.log("✅ Student #2 created:", student2.username, student2Plain);

	/* ======================
	 * APPLICATION #1
	 * ====================== */
	console.log("📝 Creating application #1");

	const app1 = await prisma.studentApplication.create({
		data: {
			std_user_id: student.id,
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
				},
			},
		},
	});

	console.log("✅ Application #1:", app1.std_application_id);

	/* ======================
	 * APPLICATION #2
	 * ====================== */
	console.log("📝 Creating application #2");

	const app2 = await prisma.studentApplication.create({
		data: {
			std_user_id: student2.id,
			std_application_submit: true,
			std_application_confirm: false,
			std_info: {
				create: {
					std_info_prefix: "Ms.",
					std_info_first_name: "Jane",
					std_info_last_name: "Smith",
					std_info_nick_name: "JS",
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
				},
			},
		},
	});

	console.log("✅ Application #2:", app2.std_application_id);

	/* ======================
	 * ANSWERS + SCORES
	 * ====================== */
	console.log("📋 Creating answers & scores");

	const regis1 = await prisma.studentRegisQuestionAnswer.create({
		data: {
			std_application_id: app1.std_application_id,
			std_regis_answer_section: "motivation",
			std_regis_answer: "I love programming",
		},
	});

	await prisma.staffRegisQuestionScore.create({
		data: {
			std_regis_answer_id: regis1.std_regis_answer_id,
			stf_count: 1,
			stf_score: 4.5,
			stf_user_id: staff.id,
		},
	});

	const regis2 = await prisma.studentRegisQuestionAnswer.create({
		data: {
			std_application_id: app2.std_application_id,
			std_regis_answer_section: "expectation",
			std_regis_answer: "I want teamwork experience",
		},
	});

	await prisma.staffRegisQuestionScore.create({
		data: {
			std_regis_answer_id: regis2.std_regis_answer_id,
			stf_count: 1,
			stf_score: 3.5,
			stf_user_id: staff2.id,
		},
	});

	console.log("🎉 Prisma seed completed successfully");
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
