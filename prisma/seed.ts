import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "src/config/app.config";
import { auth } from "src/lib/auth";
import { AppInfoGender, AppInfoStatus, ApplicationResult, FileType, PrismaClient, UserRoles } from "../generated/prisma/client";

class PrismaSeed {
	private readonly adapter: PrismaPg;
	private readonly prisma: PrismaClient;

	constructor() {
		this.adapter = new PrismaPg({
			connectionString: config.db.url,
		});
		this.prisma = new PrismaClient({ adapter: this.adapter });
	}

	// =====================
	// USER CREATION METHODS
	// =====================

	async createAdminUser() {
		const data = await auth.api.signUpEmail({
			body: {
				email: "admin@test.com",
				name: "Admin User",
				password: "Password123!",
				username: "admin",
				displayUsername: "Admin 1234",
			},
		});
		await this.prisma.user.update({
			where: { id: data.user.id },
			data: { role: UserRoles.admin },
		});
		console.log("✅ Created admin user:", data.user.email);
		return data.user;
	}

	async createRegisUser() {
		const data = await auth.api.signUpEmail({
			body: {
				email: "regis@test.com",
				name: "Regis Admin",
				password: "Password123!",
				username: "regis",
				displayUsername: "Regis 1234",
			},
		});
		await this.prisma.user.update({
			where: { id: data.user.id },
			data: { role: UserRoles.regis },
		});
		console.log("✅ Created regis user:", data.user.email);
		return data.user;
	}

	async createAcademicUser() {
		const data = await auth.api.signUpEmail({
			body: {
				email: "academic@test.com",
				name: "Academic Admin",
				password: "Password123!",
				username: "academic",
				displayUsername: "Academic 1234",
			},
		});
		await this.prisma.user.update({
			where: { id: data.user.id },
			data: { role: UserRoles.academic },
		});
		console.log("✅ Created academic user:", data.user.email);
		return data.user;
	}

	async createStaffUser() {
		const data = await auth.api.signUpEmail({
			body: {
				email: "staff@test.com",
				name: "Staff Admin",
				password: "Password123!",
				username: "staff",
				displayUsername: "Staff 1234",
			},
		});
		await this.prisma.user.update({
			where: { id: data.user.id },
			data: { role: UserRoles.staff },
		});
		console.log("✅ Created staff user:", data.user.email);
		return data.user;
	}

	async createNormalUser(index: number) {
		const data = await auth.api.signUpEmail({
			body: {
				email: `user${index}@test.com`,
				name: `Test User ${index}`,
				password: "Password123!",
				username: `user${index}`,
				displayUsername: `User ${index}`,
			},
		});
		console.log("✅ Created normal user:", data.user.email);
		return data.user;
	}

	async createBannedUser() {
		const data = await auth.api.signUpEmail({
			body: {
				email: "banned@test.com",
				name: "Banned User",
				password: "Password123!",
				username: "banned",
				displayUsername: "Banned User",
			},
		});
		await this.prisma.user.update({
			where: { id: data.user.id },
			data: {
				banned: true,
				banReason: "Violation of terms of service",
				banExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
			},
		});
		console.log("✅ Created banned user:", data.user.email);
		return data.user;
	}

	// ================================
	// APPLICATION CREATION METHODS
	// ================================

	async createEmptyApplication(userId: string) {
		const application = await this.prisma.studentApplication.create({
			data: {
				std_user_id: userId,
				std_application_submit: false,
				std_application_confirm: false,
				std_application_result: ApplicationResult.waiting_for_announcement,
			},
		});
		console.log("✅ Created empty application:", application.std_application_id);
		return application;
	}

	async createApplicationWithInfo(userId: string, gender: AppInfoGender) {
		const application = await this.prisma.studentApplication.create({
			data: {
				std_user_id: userId,
				std_application_submit: false,
				std_application_confirm: false,
				std_application_result: ApplicationResult.waiting_for_announcement,
				std_info: {
					create: {
						std_info_prefix: gender === AppInfoGender.male ? "นาย" : "นางสาว",
						std_info_first_name: "ทดสอบ",
						std_info_last_name: "ระบบ",
						std_info_nick_name: "เทส",
						std_info_age: 16,
						std_info_birthdate: "2010-01-15",
						std_info_gender: gender,
						std_info_sexuality: "straight",
						std_info_religion: "พุทธ",
						std_info_phone_number: "0812345678",
						std_info_education_level: "ม.5",
						std_info_education_institute: "โรงเรียนเตรียมอุดมศึกษา",
						std_info_education_plan: "วิทย์-คณิต",
						std_info_parent_fullname: "นายทดสอบ ระบบ",
						std_info_parent_relation: "บิดา",
						std_info_parent_phone_number: "0898765432",
						std_info_have_participated: false,
						std_info_have_laptop: true,
						std_info_can_participate_every_day: true,
						std_info_medical_insurance: "ประกันสังคม",
						std_info_chronic_disease: "ไม่มี",
						std_info_drug_allergy: "ไม่มี",
						std_info_food_allergy: "ไม่มี",
						std_info_blood_group: "A",
						std_info_address: "123 ถนนพระราม 1 แขวงวังใหม่ เขตปทุมวัน กรุงเทพฯ 10330",
						std_info_shirt_size: "M",
						std_info_travel_plan: "มากับผู้ปกครอง",
						std_info_laptop_os: "Windows",
						std_info_have_tablet: false,
						std_info_have_mouse: true,
					},
				},
				std_status: {
					create: {
						std_status_info_done: true,
						std_status_file_done: false,
						std_status_regis_question_done: false,
						std_status_acdemic_question_done: false,
						std_status_payment_done: false,
					},
				},
			},
		});
		console.log("✅ Created application with info:", application.std_application_id);
		return application;
	}

	async createFullApplication(userId: string, index: number) {
		const genders = [AppInfoGender.male, AppInfoGender.female, AppInfoGender.lgtv];
		const gender = genders[index % genders.length];

		const application = await this.prisma.studentApplication.create({
			data: {
				std_user_id: userId,
				std_application_submit: true,
				std_application_confirm: false,
				std_application_result: ApplicationResult.waiting_for_announcement,
				std_info: {
					create: {
						std_info_prefix: gender === AppInfoGender.male ? "นาย" : "นางสาว",
						std_info_first_name: `ชื่อจริง${index}`,
						std_info_last_name: `นามสกุล${index}`,
						std_info_nick_name: `ชื่อเล่น${index}`,
						std_info_age: 15 + (index % 3),
						std_info_birthdate: `200${9 - (index % 3)}-0${(index % 9) + 1}-${10 + (index % 20)}`,
						std_info_gender: gender,
						std_info_sexuality: ["straight", "gay", "bisexual"][index % 3],
						std_info_religion: ["พุทธ", "คริสต์", "อิสลาม", "ไม่มีศาสนา"][index % 4],
						std_info_phone_number: `08${String(index).padStart(8, "0")}`,
						std_info_education_level: ["ม.4", "ม.5", "ม.6"][index % 3],
						std_info_education_institute: ["โรงเรียนเตรียมอุดมศึกษา", "โรงเรียนสวนกุหลาบวิทยาลัย", "โรงเรียนบดินทรเดชา", "โรงเรียนมหิดลวิทยานุสรณ์"][index % 4],
						std_info_education_plan: ["วิทย์-คณิต", "ศิลป์-คำนวณ", "ศิลป์-ภาษา"][index % 3],
						std_info_parent_fullname: `นายผู้ปกครอง ${index}`,
						std_info_parent_relation: ["บิดา", "มารดา", "ผู้ปกครอง"][index % 3],
						std_info_parent_phone_number: `09${String(index).padStart(8, "0")}`,
						std_info_have_participated: index % 2 === 0,
						std_info_have_laptop: index % 3 !== 0,
						std_info_can_participate_every_day: index % 4 !== 0,
						std_info_medical_insurance: ["ประกันสังคม", "ประกันเอกชน", "บัตรทอง"][index % 3],
						std_info_chronic_disease: index % 5 === 0 ? "โรคภูมิแพ้" : "ไม่มี",
						std_info_drug_allergy: index % 7 === 0 ? "ยาเพนนิซิลิน" : "ไม่มี",
						std_info_food_allergy: index % 6 === 0 ? "อาหารทะเล" : "ไม่มี",
						std_info_blood_group: ["A", "B", "O", "AB"][index % 4],
						std_info_address: `${100 + index} ถนนทดสอบ แขวงทดสอบ เขตทดสอบ กรุงเทพฯ ${10000 + index}`,
						std_info_shirt_size: ["XS", "S", "M", "L", "XL", "2XL"][index % 6],
						std_info_travel_plan: ["มากับผู้ปกครอง", "มาเอง", "มากับเพื่อน"][index % 3],
						std_info_laptop_os: ["Windows", "macOS", "Linux"][index % 3],
						std_info_have_tablet: index % 2 === 0,
						std_info_have_mouse: index % 3 !== 2,
					},
				},
				std_status: {
					create: {
						std_status_info_done: true,
						std_status_file_done: true,
						std_status_regis_question_done: true,
						std_status_acdemic_question_done: true,
						std_status_payment_done: false,
					},
				},
			},
		});

		// Add regis questions
		await this.createRegisQuestionAnswers(application.std_application_id);

		// Add academic questions
		await this.createAcademicQuestionAnswers(application.std_application_id);

		console.log("✅ Created full application:", application.std_application_id);
		return application;
	}

	async createSubmittedApplication(userId: string, index: number) {
		const application = await this.createFullApplication(userId, index);

		// Add mock files
		await this.createApplicationFiles(application.std_application_id);

		// Update submit status
		await this.prisma.studentApplication.update({
			where: { std_application_id: application.std_application_id },
			data: {
				std_application_submit: true,
			},
		});

		await this.prisma.applicationStatus.update({
			where: { std_application_id: application.std_application_id },
			data: {
				std_status_file_done: true,
				std_status_payment_done: true,
			},
		});

		console.log("✅ Created submitted application:", application.std_application_id);
		return application;
	}

	async createPassedApplication(userId: string, index: number) {
		const application = await this.createSubmittedApplication(userId, index);

		await this.prisma.studentApplication.update({
			where: { std_application_id: application.std_application_id },
			data: {
				std_application_pass: true,
				std_application_result: ApplicationResult.pass,
				stf_application_allow_confirm: true,
			},
		});

		await this.prisma.applicationStatus.update({
			where: { std_application_id: application.std_application_id },
			data: {
				stf_regis_question_checked: true,
				stf_academic_question_checked: true,
				stf_question_result: 85.5,
				stf_question_result_detail: "คะแนนดี มีความพร้อมในการเข้าร่วมค่าย",
			},
		});

		console.log("✅ Created passed application:", application.std_application_id);
		return application;
	}

	async createConfirmedApplication(userId: string, index: number) {
		const application = await this.createPassedApplication(userId, index);

		await this.prisma.studentApplication.update({
			where: { std_application_id: application.std_application_id },
			data: {
				std_application_confirm: true,
			},
		});

		console.log("✅ Created confirmed application:", application.std_application_id);
		return application;
	}

	async createReserveApplication(userId: string, index: number) {
		const application = await this.createSubmittedApplication(userId, index);

		await this.prisma.studentApplication.update({
			where: { std_application_id: application.std_application_id },
			data: {
				std_application_result: ApplicationResult.reserve,
			},
		});

		await this.prisma.applicationStatus.update({
			where: { std_application_id: application.std_application_id },
			data: {
				stf_regis_question_checked: true,
				stf_academic_question_checked: true,
				stf_question_result: 70.0,
				stf_question_result_detail: "คะแนนผ่านเกณฑ์ขั้นต่ำ รอบสำรอง",
			},
		});

		console.log("✅ Created reserve application:", application.std_application_id);
		return application;
	}

	async createFailedApplication(userId: string, index: number) {
		const application = await this.createSubmittedApplication(userId, index);

		await this.prisma.studentApplication.update({
			where: { std_application_id: application.std_application_id },
			data: {
				std_application_result: ApplicationResult.fail,
			},
		});

		await this.prisma.applicationStatus.update({
			where: { std_application_id: application.std_application_id },
			data: {
				stf_regis_question_checked: true,
				stf_academic_question_checked: true,
				stf_question_result: 45.0,
				stf_question_result_detail: "คะแนนไม่ผ่านเกณฑ์ขั้นต่ำ",
			},
		});

		console.log("✅ Created failed application:", application.std_application_id);
		return application;
	}

	async createAbortedApplication(userId: string) {
		const application = await this.prisma.studentApplication.create({
			data: {
				std_user_id: userId,
				std_application_submit: false,
				std_application_confirm: false,
				std_application_abort_reason: "ไม่สะดวกในการเข้าร่วม",
				std_application_result: ApplicationResult.fail,
			},
		});
		console.log("✅ Created aborted application:", application.std_application_id);
		return application;
	}

	// ================================
	// QUESTION ANSWERS METHODS
	// ================================

	async createRegisQuestionAnswers(applicationId: string) {
		const sections = ["ทำไมถึงอยากเข้าร่วมค่าย ComCamp", "เล่าประสบการณ์การเขียนโปรแกรม", "คุณคาดหวังอะไรจากค่ายนี้"];

		const answers = [
			"ผมอยากเข้าร่วมค่ายเพราะต้องการเรียนรู้เกี่ยวกับการเขียนโปรแกรมและพัฒนาทักษะด้านคอมพิวเตอร์ ผมสนใจเรื่อง AI และ Machine Learning มาก และอยากรู้ว่าสาขาวิศวกรรมคอมพิวเตอร์เรียนอะไรบ้าง",
			"ผมเริ่มเขียนโปรแกรมตั้งแต่ ม.2 โดยเริ่มจากภาษา Python ทำ project เล็กๆ เช่น เกมงูกินหาง และ calculator อีกทั้งยังเคยลองทำเว็บไซต์ด้วย HTML/CSS/JavaScript",
			"ผมคาดหวังว่าจะได้เรียนรู้เทคนิคการเขียนโปรแกรมใหม่ๆ ได้รู้จักเพื่อนใหม่ที่มีความสนใจเหมือนกัน และได้รับคำแนะนำจากรุ่นพี่เกี่ยวกับการเรียนในมหาวิทยาลัย",
		];

		for (let i = 0; i < sections.length; i++) {
			await this.prisma.applicationRegisQuestionAnswer.create({
				data: {
					std_application_id: applicationId,
					std_regis_answer_section: sections[i],
					std_regis_answer: answers[i],
				},
			});
		}
	}

	async createAcademicQuestionAnswers(applicationId: string) {
		const sections = ["แก้โจทย์ปัญหาลอจิก", "อธิบายอัลกอริทึมการเรียงข้อมูล", "แก้โจทย์คณิตศาสตร์"];

		const answers = [
			"จากโจทย์ที่ให้มา ผมจะใช้วิธีการแบ่งกรณีและพิจารณาทีละขั้นตอน...",
			"Bubble Sort เป็นอัลกอริทึมการเรียงข้อมูลที่ง่ายที่สุด โดยจะเปรียบเทียบสมาชิกที่อยู่ติดกันและสลับตำแหน่งถ้าไม่ถูกต้อง...",
			"ในการแก้สมการ x^2 + 5x + 6 = 0 เราสามารถแยกตัวประกอบได้เป็น (x+2)(x+3) = 0 ดังนั้น x = -2 หรือ x = -3",
		];

		for (let i = 0; i < sections.length; i++) {
			await this.prisma.applicationAcademicQuestionAnswer.create({
				data: {
					std_application_id: applicationId,
					std_academic_answer_section: sections[i],
					std_academic_answer: answers[i],
				},
			});
		}
	}

	// ================================
	// FILES METHODS
	// ================================

	async createApplicationFiles(applicationId: string) {
		const fileTypes: FileType[] = [FileType.file_face, FileType.file_national_id, FileType.file_parent_permission, FileType.file_pp_1, FileType.file_pp_7, FileType.file_slip];

		for (const fileType of fileTypes) {
			await this.prisma.applicationFile.create({
				data: {
					std_application_id: applicationId,
					std_file_originalname: `${fileType}_${applicationId}.jpg`,
					std_file_mimetype: "image/jpeg",
					std_file_encoding: "7bit",
					std_file_size: Math.floor(Math.random() * 500000) + 100000,
					std_file_key: `uploads/${applicationId}/${fileType}_${Date.now()}.jpg`,
					std_file_type: fileType,
					std_file_disabled: false,
				},
			});
		}
	}

	// ================================
	// SCORING METHODS
	// ================================

	async createRegisQuestionScores(staffUserId: string, answerId: number, count: number) {
		await this.prisma.applicationRegisQuestionScore.create({
			data: {
				std_regis_answer_id: answerId,
				stf_count: count,
				stf_score: Math.floor(Math.random() * 5) + 1,
				stf_comment: "คำตอบดี มีความคิดสร้างสรรค์",
				stf_user_id: staffUserId,
			},
		});
	}

	async createAcademicQuestionScores(staffUserId: string, answerId: number, count: number) {
		await this.prisma.applicationAcademicQuestionScore.create({
			data: {
				std_academic_answer_id: answerId,
				stf_count: count,
				stf_score: Math.floor(Math.random() * 10) + 1,
				stf_user_id: staffUserId,
			},
		});
	}

	// ================================
	// INFO CHECK METHODS
	// ================================

	async createInfoCheck(applicationId: string, staffUserId: string, status: AppInfoStatus) {
		await this.prisma.applicationInfoCheck.create({
			data: {
				std_application_id: applicationId,
				stf_user_id: staffUserId,
				std_info_status: status,
			},
		});
	}

	// ================================
	// MAIN SEED METHOD
	// ================================

	async seed() {
		console.log("🌱 Starting seed...\n");

		try {
			// Create staff users
			console.log("📝 Creating staff users...");
			const admin = await this.createAdminUser();
			// const regis = await this.createRegisUser();
			// const academic = await this.createAcademicUser();
			// const staff = await this.createStaffUser();

			// // Create banned user
			// console.log("\n📝 Creating banned user...");
			// await this.createBannedUser();

			// // Create normal users with various application states
			// console.log("\n📝 Creating normal users with applications...\n");

			// // User 1: Empty application (just registered)
			// const user1 = await this.createNormalUser(1);
			// await this.createEmptyApplication(user1.id);

			// // User 2: Application with info only
			// const user2 = await this.createNormalUser(2);
			// await this.createApplicationWithInfo(user2.id, AppInfoGender.male);

			// // User 3: Full application (not submitted)
			// const user3 = await this.createNormalUser(3);
			// await this.createFullApplication(user3.id, 3);

			// // User 4: Submitted application (waiting for review)
			// const user4 = await this.createNormalUser(4);
			// await this.createSubmittedApplication(user4.id, 4);

			// // User 5: Passed application (not confirmed)
			// const user5 = await this.createNormalUser(5);
			// await this.createPassedApplication(user5.id, 5);

			// // User 6: Confirmed application
			// const user6 = await this.createNormalUser(6);
			// await this.createConfirmedApplication(user6.id, 6);

			// // User 7: Reserve application
			// const user7 = await this.createNormalUser(7);
			// await this.createReserveApplication(user7.id, 7);

			// // User 8: Failed application
			// const user8 = await this.createNormalUser(8);
			// await this.createFailedApplication(user8.id, 8);

			// // User 9: Aborted application
			// const user9 = await this.createNormalUser(9);
			// await this.createAbortedApplication(user9.id);

			// // User 10: Female applicant
			// const user10 = await this.createNormalUser(10);
			// await this.createApplicationWithInfo(user10.id, AppInfoGender.female);

			// // User 11: LGBTQ+ applicant
			// const user11 = await this.createNormalUser(11);
			// await this.createApplicationWithInfo(user11.id, AppInfoGender.lgtv);

			// // Create some scored applications
			// console.log("\n📝 Creating scored applications...");

			// // Get regis answers and score them
			// const regisAnswers = await this.prisma.applicationRegisQuestionAnswer.findMany({
			// 	take: 5,
			// });
			// for (let i = 0; i < regisAnswers.length; i++) {
			// 	await this.createRegisQuestionScores(regis.id, regisAnswers[i].std_regis_answer_id, i + 1);
			// }

			// // Get academic answers and score them
			// const academicAnswers = await this.prisma.applicationAcademicQuestionAnswer.findMany({
			// 	take: 5,
			// });
			// for (let i = 0; i < academicAnswers.length; i++) {
			// 	await this.createAcademicQuestionScores(academic.id, academicAnswers[i].std_academic_answer_id, i + 1);
			// }

			// // Create bulk users for testing pagination (users 12-20)
			// console.log("\n📝 Creating bulk users for pagination testing...");
			// for (let i = 12; i <= 20; i++) {
			// 	const user = await this.createNormalUser(i);
			// 	await this.createSubmittedApplication(user.id, i);
			// }

			// console.log("\n✅ Seed completed successfully!");
			// console.log("\n📊 Summary:");
			// console.log("- Staff users: 4 (admin, regis, academic, staff)");
			// console.log("- Banned user: 1");
			// console.log("- Normal users: 20");
			// console.log("- Applications: ~20 (various states)");
		} catch (error) {
			console.error("❌ Seed failed:", error);
			throw error;
		} finally {
			await this.prisma.$disconnect();
		}
	}
}

// Run seed
const prismaSeed = new PrismaSeed();
prismaSeed.seed();
