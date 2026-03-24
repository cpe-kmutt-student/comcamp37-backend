import { Injectable } from "@nestjs/common";
import ExcelJS from "exceljs";
import { type Response } from "express";
import { PrismaService } from "src/core/prisma/prisma.service";
import { S3Service } from "src/core/s3/s3.service";

@Injectable()
export class StaffExportService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly s3: S3Service,
	) {}

	private decodeQueryStrings(data: Record<string, unknown> | null | undefined): Record<string, unknown> {
		if (!data) return {};

		return Object.fromEntries(
			Object.entries(data).map(([key, value]) => {
				if (typeof value !== "string") return [key, value];
				try {
					return [key, decodeURI(value)];
				} catch {
					return [key, value];
				}
			}),
		);
	}

	async exportAll(res: Response) {
		const applications = await this.prisma.studentApplication.findMany({
			where: {
				std_application_confirm: true,
			},
			select: {
				std_application_id: true,
				std_user: {
					select: {
						id: true,
						email: true,
					},
				},
				std_total_score: {
					select: {
						std_regis_score: true,
						std_academic_score: true,
						std_academic_chaos_score: true,
						std_total_score: true,
					},
				},
				std_file: {
					where: {
						std_file_disabled: false,
					},
					select: {
						std_file_type: true,
						std_file_key: true,
						pe_payment_evidence: {
							select: {
								pe_transaction_actual_amount: true,
								pe_transaction_date: true,
							},
						},
					},
				},
				std_info: {
					select: {
						std_info_prefix: true,
						std_info_first_name: true,
						std_info_last_name: true,
						std_info_nick_name: true,
						std_info_age: true,
						std_info_birthdate: true,
						std_info_gender: true,
						std_info_sexuality: true,
						std_info_religion: true,
						std_info_phone_number: true,
						std_info_education_level: true,
						std_info_education_institute: true,
						std_info_education_plan: true,
						std_info_grade_gpax: true,
						std_info_grade_math: true,
						std_info_grade_sci: true,
						std_info_grade_eng: true,
						std_info_parent_fullname: true,
						std_info_parent_relation: true,
						std_info_parent_phone_number: true,
						std_info_have_participated: true,
						std_info_have_laptop: true,
						std_info_can_participate_every_day: true,
						std_info_medical_insurance: true,
						std_info_chronic_disease: true,
						std_info_drug_allergy: true,
						std_info_food_allergy: true,
						std_info_blood_group: true,
						std_info_address: true,
						std_info_shirt_size: true,
						std_info_travel_plan: true,
						std_info_laptop_os: true,
						std_info_have_tablet: true,
						std_info_have_mouse: true,
					},
				},
			},
		});

		const data = await Promise.all(
			applications.map(async (app) => {
				const entries = await Promise.all(
					app.std_file.map(async (file) => {
						const url = await this.s3.signedUrl(file.std_file_key);
						return [file.std_file_type, url || ""] as const;
					}),
				);
				const result = this.decodeQueryStrings(Object.fromEntries(entries) as Record<string, string>);
				const userData = this.decodeQueryStrings(app.std_user);
				const infoData = this.decodeQueryStrings(app.std_info);
				const scoreData = this.decodeQueryStrings(app.std_total_score);

				return {
					...app,
					...userData,
					...infoData,
					...scoreData,
					...result,
				};
			}),
		);

		const workbook = new ExcelJS.Workbook();
		const worksheetAll = workbook.addWorksheet("All");
		const worksheetMaleM4 = workbook.addWorksheet("Male M4");
		const worksheetMaleM5 = workbook.addWorksheet("Male M5");
		const worksheetFemaleM4 = workbook.addWorksheet("Female M4");
		const worksheetFemaleM5 = workbook.addWorksheet("FeMale M5");

		const columns = [
			{ header: "Application ID", key: "std_application_id" },
			{ header: "User ID", key: "id" },
			{ header: "Email", key: "email" },
			{ header: "Prefix", key: "std_info_prefix" },
			{ header: "Firstname", key: "std_info_first_name" },
			{ header: "Lastname", key: "std_info_last_name" },
			{ header: "Nickname", key: "std_info_nick_name" },
			{ header: "Age", key: "std_info_age" },
			{ header: "Birthdate", key: "std_info_birthdate" },
			{ header: "Gender", key: "std_info_gender" },
			{ header: "Sexuality", key: "std_info_sexuality" },
			{ header: "Religion", key: "std_info_religion" },
			{ header: "Phone Number", key: "std_info_phone_number" },
			{ header: "Address", key: "std_info_address" },
			{ header: "Shirt Size", key: "std_info_shirt_size" },
			{ header: "Travel Plan", key: "std_info_travel_plan" },
			{ header: "Grade", key: "std_info_education_level" },
			{ header: "Institute", key: "std_info_education_institute" },
			{ header: "Plan", key: "std_info_education_plan" },
			{ header: "GPAX", key: "std_info_grade_gpax" },
			{ header: "GPA Math", key: "std_info_grade_math" },
			{ header: "GPA Science", key: "std_info_grade_sci" },
			{ header: "GPA English", key: "std_info_grade_eng" },
			{ header: "Medical Insurance", key: "std_info_medical_insurance" },
			{ header: "Chronic Disease", key: "std_info_chronic_disease" },
			{ header: "Drug Allergy", key: "std_info_drug_allergy" },
			{ header: "Food Allergy", key: "std_info_food_allergy" },
			{ header: "Parent Name", key: "std_info_parent_fullname" },
			{ header: "Parent Relation", key: "std_info_parent_relation" },

			{ header: "Have participated before", key: "std_info_have_participated" },
			{ header: "Have laptop", key: "std_info_have_laptop" },
			{ header: "Laptop OS", key: "std_info_laptop_os" },
			{ header: "Have mouse", key: "std_info_have_mouse" },
			{ header: "Have tablet", key: "std_info_have_tablet" },
			{ header: "Can participate every day", key: "std_info_can_participate_every_day" },

			{ header: "Regis Question Score", key: "std_regis_score" },
			{ header: "Academic Question Score", key: "std_academic_score" },
			{ header: "Academic Chaos Question Score", key: "std_academic_chaos_score" },
			{ header: "Total Score (Regis + Academic Chaos)", key: "std_total_score" },

			{ header: "Face", key: "file_face" },
			{ header: "National ID", key: "file_national_id" },
			{ header: "Transcript", key: "file_pp_1" },
			{ header: "Student Certification", key: "file_pp_7" },
			{ header: "Parent Permission", key: "file_parent_permission" },
		];

		worksheetAll.columns = columns;
		worksheetMaleM4.columns = columns;
		worksheetMaleM5.columns = columns;
		worksheetFemaleM4.columns = columns;
		worksheetFemaleM5.columns = columns;

		worksheetAll.addRows(data);
		worksheetMaleM4.addRows(data.filter((d: any) => (d.std_info_education_level === "มัธยมศึกษาปีที่ 4" || d.std_info_education_level === "ปวช. 1") && d.std_info_gender === "male"));
		worksheetMaleM5.addRows(data.filter((d: any) => (d.std_info_education_level === "มัธยมศึกษาปีที่ 5" || d.std_info_education_level === "ปวช. 2") && d.std_info_gender === "male"));
		worksheetFemaleM4.addRows(data.filter((d: any) => (d.std_info_education_level === "มัธยมศึกษาปีที่ 4" || d.std_info_education_level === "ปวช. 1") && d.std_info_gender === "female"));
		worksheetFemaleM5.addRows(data.filter((d: any) => (d.std_info_education_level === "มัธยมศึกษาปีที่ 5" || d.std_info_education_level === "ปวช. 2") && d.std_info_gender === "female"));

		res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		res.setHeader("Content-Disposition", "attachment; filename=ComCamp37-khomul-nongnong.xlsx");

		// // asked chat dont ask me how it work
		worksheetAll.columns.forEach((column) => {
			let maxLength = 0;
			if (!column.eachCell) return;
			column.eachCell({ includeEmpty: true }, (cell) => {
				const value = cell.value ? cell.value.toString() : "";
				maxLength = Math.max(maxLength, value.length);
			});
			column.width = maxLength + 2;
		});
		worksheetMaleM4.columns.forEach((column) => {
			let maxLength = 0;
			if (!column.eachCell) return;
			column.eachCell({ includeEmpty: true }, (cell) => {
				const value = cell.value ? cell.value.toString() : "";
				maxLength = Math.max(maxLength, value.length);
			});
			column.width = maxLength + 2;
		});
		worksheetMaleM5.columns.forEach((column) => {
			let maxLength = 0;
			if (!column.eachCell) return;
			column.eachCell({ includeEmpty: true }, (cell) => {
				const value = cell.value ? cell.value.toString() : "";
				maxLength = Math.max(maxLength, value.length);
			});
			column.width = maxLength + 2;
		});
		worksheetFemaleM4.columns.forEach((column) => {
			let maxLength = 0;
			if (!column.eachCell) return;
			column.eachCell({ includeEmpty: true }, (cell) => {
				const value = cell.value ? cell.value.toString() : "";
				maxLength = Math.max(maxLength, value.length);
			});
			column.width = maxLength + 2;
		});
		worksheetFemaleM5.columns.forEach((column) => {
			let maxLength = 0;
			if (!column.eachCell) return;
			column.eachCell({ includeEmpty: true }, (cell) => {
				const value = cell.value ? cell.value.toString() : "";
				maxLength = Math.max(maxLength, value.length);
			});
			column.width = maxLength + 2;
		});

		await workbook.xlsx.write(res);
		res.end();
	}
}
