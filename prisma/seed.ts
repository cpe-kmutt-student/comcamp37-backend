import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "src/config/app.config"; // Ensure this path matches your project
import { auth } from "src/lib/auth"; // Ensure this path matches your project
import { FileType, PrismaClient, UserRoles } from "../generated/prisma/client";

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

// Helper to create user via Auth Lib (as per your snippet)
// If this fails, it usually means the user already exists or Auth is down.
async function createUser({ email, username, password, name, role }: { email: string; username: string; password: string; name: string; role: UserRoles }) {
	console.log(`👤 Processing user: ${username}`);

	let userId = "";

	// 1. Try to find existing user in Prisma to avoid duplicate Auth calls if seed runs twice
	const existing = await prisma.user.findUnique({ where: { email } });

	if (existing) {
		console.log(`   User ${username} already exists. Updating role...`);
		userId = existing.id;
		await prisma.user.update({
			where: { id: userId },
			data: { role },
		});
	} else {
		// 2. Create via Auth API
		try {
			const result = await auth.api.signUpEmail({
				body: { email, username, password, name },
			});

			if (!result?.user) throw new Error("Auth API returned no user");
			userId = result.user.id;

			// 3. Ensure Role is set (Auth might default to 'user')
			await prisma.user.update({
				where: { id: userId },
				data: { role },
			});
			console.log(`   ✅ Created new user: ${username}`);
		} catch (error) {
			console.error(`   ⚠️ Failed to create user ${username} via Auth. (Check if Auth service is running)`);
			throw error;
		}
	}

	return prisma.user.findUniqueOrThrow({ where: { id: userId } });
}

/* ======================
 * MAIN SEED
 * ====================== */
async function main() {
	console.log("🌱 Seed started...");

	/* ------------------------------------------------------------------
	 * 1. CREATE USERS (Admin, Staff, Students)
	 * ------------------------------------------------------------------ */

	// Admin
	const admin = await createUser({
		email: "admin@camp.com",
		username: "admin",
		password: "Password123!",
		name: "Admin User",
		role: UserRoles.admin,
	});

	// Staff (Regis team)
	const staffRegis = await createUser({
		email: "regis@camp.com",
		username: "staff_regis",
		password: "Password123!",
		name: "Staff Registration",
		role: UserRoles.regis,
	});

	// Staff (Academic team)
	const staffAcademic = await createUser({
		email: "academic@camp.com",
		username: "staff_academic",
		password: "Password123!",
		name: "Staff Academic",
		role: UserRoles.academic,
	});

	// Students
	const stdPass = await createUser({
		email: "pass@student.com",
		username: "student_pass",
		password: "Password123!",
		name: "Student Passed",
		role: UserRoles.user,
	});

	const stdFail = await createUser({
		email: "fail@student.com",
		username: "student_fail",
		password: "Password123!",
		name: "Student Failed",
		role: UserRoles.user,
	});

	const stdNew = await createUser({
		email: "new@student.com",
		username: "student_new",
		password: "Password123!",
		name: "Student Newbie",
		role: UserRoles.user,
	});

	/* ------------------------------------------------------------------
	 * 2. SCENARIO A: The "Golden" Applicant (Complete, Scored, Passed)
	 * ------------------------------------------------------------------ */
	console.log("📝 Creating Application: Golden Applicant (Passed)");

	const appPass = await prisma.studentApplication.create({
		data: {
			std_user_id: stdPass.id,
			std_application_submit: true,
			std_application_confirm: true,
			std_application_pass: true, // They made it!

			// 1:1 Relation: Info
			std_info: {
				create: {
					std_info_prefix: "Mr.",
					std_info_first_name: "John",
					std_info_last_name: "Gold",
					std_info_nick_name: "Johnny",
					std_info_age: 18,
					std_info_birthdate: "2005-05-15",
					std_info_gender: "Male",
					std_info_religion: "Buddhism",
					std_info_phone_number: "0812345678",
					std_info_education_level: "Grade 12",
					std_info_education_institute: "Tech High School",
					std_info_education_plan: "Science-Math",
					std_info_have_laptop: true,
					std_info_laptop_os: "Windows",
					std_info_shirt_size: "L",
					std_info_medical_insurance: "None",
				},
			},

			// 1:N Relation: Files
			std_file: {
				create: [
					{
						std_file_key: "file_face_" + stdPass.id,
						std_file_type: FileType.file_face,
						std_file_originalname: "face.jpg",
						std_file_mimetype: "image/jpeg",
						std_file_size: 1024,
					},
					{
						std_file_key: "file_slip_" + stdPass.id,
						std_file_type: FileType.file_slip,
						std_file_originalname: "slip.pdf",
						std_file_mimetype: "application/pdf",
						std_file_size: 2048,
					},
				],
			},

			// 1:N Relation: Registration Questions
			std_regis_question: {
				create: {
					std_regis_answer_section: "Motivation",
					std_regis_answer: "I have won 3 hackathons and I love coding.",
				},
			},

			// 1:N Relation: Academic Questions
			std_academic_question: {
				create: {
					std_academic_answer_section: "Logic",
					std_academic_answer: "The answer is 42 because of the algorithm provided.",
				},
			},

			// 1:1 Relation: Status
			std_status: {
				create: {
					std_status_info_done: true,
					std_status_file_done: true,
					std_status_regis_question_done: true,
					std_status_acdemic_question_done: true,
					std_status_payment_done: true,
					stf_info_checked: true,
					stf_regis_question_checked: true,
					stf_academic_question_checked: true,
					stf_question_result: 95.5,
					stf_question_result_detail: "Excellent candidate.",
				},
			},
		},
		include: {
			std_regis_question: true,
			std_academic_question: true,
		},
	});

	// --- Add Scores for Golden Applicant ---

	// 1. Score Regis Question (Graded by Staff Regis)
	await prisma.applicationRegisQuestionScore.create({
		data: {
			std_regis_answer_id: appPass.std_regis_question[0].std_regis_answer_id,
			stf_user_id: staffRegis.id,
			stf_score: 10,
			stf_count: 1,
		},
	});

	// 2. Score Academic Question (Graded by Staff Academic)
	await prisma.applicationAcademicQuestionScore.create({
		data: {
			std_academic_answer_id: appPass.std_academic_question[0].std_academic_answer_id,
			stf_user_id: staffAcademic.id,
			stf_score: 9.5,
			stf_count: 1,
		},
	});

	/* ------------------------------------------------------------------
	 * 3. SCENARIO B: The "Rejected" Applicant (Complete, Low Scores)
	 * ------------------------------------------------------------------ */
	console.log("📝 Creating Application: Rejected Applicant");

	const appFail = await prisma.studentApplication.create({
		data: {
			std_user_id: stdFail.id,
			std_application_submit: true,
			std_application_confirm: true,
			std_application_pass: false, // Rejected

			std_info: {
				create: {
					std_info_first_name: "Jane",
					std_info_last_name: "Silver",
					std_info_phone_number: "0899999999",
					std_info_education_level: "Grade 11",
				},
			},

			std_regis_question: {
				create: {
					std_regis_answer_section: "Motivation",
					std_regis_answer: "I dont know, my mom forced me to come.",
				},
			},

			std_status: {
				create: {
					std_status_info_done: true,
					std_status_file_done: true,
					std_status_regis_question_done: true,
					stf_regis_question_checked: true,
					stf_question_result: 20.0,
					stf_question_result_detail: "Not motivated.",
				},
			},
		},
		include: { std_regis_question: true },
	});

	// Low score from staff
	await prisma.applicationRegisQuestionScore.create({
		data: {
			std_regis_answer_id: appFail.std_regis_question[0].std_regis_answer_id,
			stf_user_id: staffRegis.id,
			stf_score: 2,
			stf_count: 1,
		},
	});

	/* ------------------------------------------------------------------
	 * 4. SCENARIO C: The "Newbie" Applicant (In Progress)
	 * ------------------------------------------------------------------ */
	console.log("📝 Creating Application: In-Progress Applicant");

	await prisma.studentApplication.create({
		data: {
			std_user_id: stdNew.id,
			std_application_submit: false, // Still working on it

			std_info: {
				create: {
					std_info_first_name: "Alex",
					// Missing last name, etc.
				},
			},

			std_status: {
				create: {
					std_status_info_done: false,
					std_status_file_done: false,
				},
			},
		},
	});

	console.log("🎉 Seed completed successfully!");
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
