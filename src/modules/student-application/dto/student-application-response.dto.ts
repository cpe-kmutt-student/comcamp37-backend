import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AppInfoGender, ApplicationResult, FileType } from "../../../../generated/prisma/enums";

export class ApplicationInfoResponseDto {
	@ApiProperty({ description: "Application ID", example: "550e8400-e29b-41d4-a716-446655440000" })
	std_application_id: string;

	@ApiPropertyOptional({ description: "Prefix (นาย, นางสาว)", example: "นาย" })
	std_info_prefix?: string;

	@ApiPropertyOptional({ description: "First name", example: "สมชาย" })
	std_info_first_name?: string;

	@ApiPropertyOptional({ description: "Last name", example: "ใจดี" })
	std_info_last_name?: string;

	@ApiPropertyOptional({ description: "Nickname", example: "ชาย" })
	std_info_nick_name?: string;

	@ApiPropertyOptional({ description: "Age", example: 17 })
	std_info_age?: number;

	@ApiPropertyOptional({ description: "Birthdate", example: "2009-01-15" })
	std_info_birthdate?: string;

	@ApiPropertyOptional({ description: "Gender", enum: AppInfoGender, example: "male" })
	std_info_gender?: AppInfoGender;

	@ApiPropertyOptional({ description: "Sexuality", example: "heterosexual" })
	std_info_sexuality?: string;

	@ApiPropertyOptional({ description: "Religion", example: "พุทธ" })
	std_info_religion?: string;

	@ApiPropertyOptional({ description: "Phone number", example: "0812345678" })
	std_info_phone_number?: string;

	@ApiPropertyOptional({ description: "Education level", example: "ม.5" })
	std_info_education_level?: string;

	@ApiPropertyOptional({ description: "Education institute", example: "โรงเรียนตัวอย่าง" })
	std_info_education_institute?: string;

	@ApiPropertyOptional({ description: "Education plan", example: "วิทย์-คณิต" })
	std_info_education_plan?: string;

	@ApiPropertyOptional({ description: "Parent full name", example: "นายสมศักดิ์ ใจดี" })
	std_info_parent_fullname?: string;

	@ApiPropertyOptional({ description: "Parent relation", example: "บิดา" })
	std_info_parent_relation?: string;

	@ApiPropertyOptional({ description: "Parent phone number", example: "0898765432" })
	std_info_parent_phone_number?: string;

	@ApiPropertyOptional({ description: "Have participated in ComCamp before", example: false })
	std_info_have_participated?: boolean;

	@ApiPropertyOptional({ description: "Have laptop", example: true })
	std_info_have_laptop?: boolean;

	@ApiPropertyOptional({ description: "Can participate every day", example: true })
	std_info_can_participate_every_day?: boolean;

	@ApiPropertyOptional({ description: "Medical insurance", example: "ประกันสังคม" })
	std_info_medical_insurance?: string;

	@ApiPropertyOptional({ description: "Chronic disease", example: "ไม่มี" })
	std_info_chronic_disease?: string;

	@ApiPropertyOptional({ description: "Drug allergy", example: "ไม่มี" })
	std_info_drug_allergy?: string;

	@ApiPropertyOptional({ description: "Food allergy", example: "ไม่มี" })
	std_info_food_allergy?: string;

	@ApiPropertyOptional({ description: "Blood group", example: "O" })
	std_info_blood_group?: string;

	@ApiPropertyOptional({ description: "Address", example: "123 ถนนตัวอย่าง กรุงเทพฯ 10400" })
	std_info_address?: string;

	@ApiPropertyOptional({ description: "Shirt size", example: "M" })
	std_info_shirt_size?: string;

	@ApiPropertyOptional({ description: "Travel plan", example: "รถยนต์ส่วนตัว" })
	std_info_travel_plan?: string;

	@ApiPropertyOptional({ description: "Laptop OS", example: "Windows" })
	std_info_laptop_os?: string;

	@ApiPropertyOptional({ description: "Have tablet", example: false })
	std_info_have_tablet?: boolean;

	@ApiPropertyOptional({ description: "Have mouse", example: true })
	std_info_have_mouse?: boolean;

	@ApiProperty({ description: "Created at timestamp" })
	created_at: Date;

	@ApiProperty({ description: "Updated at timestamp" })
	updated_at: Date;
}

export class ApplicationFileResponseDto {
	@ApiProperty({ description: "Application ID", example: "550e8400-e29b-41d4-a716-446655440000" })
	std_application_id: string;

	@ApiPropertyOptional({ description: "Original file name", example: "photo.jpg" })
	std_file_originalname?: string;

	@ApiPropertyOptional({ description: "File MIME type", example: "image/jpeg" })
	std_file_mimetype?: string;

	@ApiPropertyOptional({ description: "File encoding", example: "7bit" })
	std_file_encoding?: string;

	@ApiPropertyOptional({ description: "File size in bytes", example: 102400 })
	std_file_size?: number;

	@ApiProperty({ description: "File key/identifier", example: "files/abc123.jpg" })
	std_file_key: string;

	@ApiProperty({ description: "File type", enum: FileType, example: "file_face" })
	std_file_type: FileType;

	@ApiProperty({ description: "File disabled status", example: false })
	std_file_disabled: boolean;

	@ApiProperty({ description: "Created at timestamp" })
	created_at: Date;

	@ApiProperty({ description: "Updated at timestamp" })
	updated_at: Date;
}

export class ApplicationRegisQuestionAnswerResponseDto {
	@ApiProperty({ description: "Application ID", example: "550e8400-e29b-41d4-a716-446655440000" })
	std_application_id: string;

	@ApiProperty({ description: "Registration answer ID", example: 1 })
	std_regis_answer_id: number;

	@ApiProperty({ description: "Answer section", example: "section1" })
	std_regis_answer_section: string;

	@ApiProperty({ description: "Answer content", example: "คำตอบของนักเรียน..." })
	std_regis_answer: string;

	@ApiProperty({ description: "Created at timestamp" })
	created_at: Date;

	@ApiProperty({ description: "Updated at timestamp" })
	updated_at: Date;
}

export class ApplicationAcademicQuestionAnswerResponseDto {
	@ApiProperty({ description: "Application ID", example: "550e8400-e29b-41d4-a716-446655440000" })
	std_application_id: string;

	@ApiProperty({ description: "Academic answer ID", example: 1 })
	std_academic_answer_id: number;

	@ApiProperty({ description: "Answer section", example: "math" })
	std_academic_answer_section: string;

	@ApiProperty({ description: "Answer content", example: "คำตอบข้อสอบ..." })
	std_academic_answer: string;

	@ApiProperty({ description: "Created at timestamp" })
	created_at: Date;

	@ApiProperty({ description: "Updated at timestamp" })
	updated_at: Date;
}

export class ApplicationStatusResponseDto {
	@ApiProperty({ description: "Application ID", example: "550e8400-e29b-41d4-a716-446655440000" })
	std_application_id: string;

	@ApiPropertyOptional({ description: "Info section completed", example: false })
	std_status_info_done?: boolean;

	@ApiPropertyOptional({ description: "File section completed", example: false })
	std_status_file_done?: boolean;

	@ApiPropertyOptional({ description: "Registration question completed", example: false })
	std_status_regis_question_done?: boolean;

	@ApiPropertyOptional({ description: "Academic question completed", example: false })
	std_status_acdemic_question_done?: boolean;

	@ApiPropertyOptional({ description: "Payment completed", example: false })
	std_status_payment_done?: boolean;

	@ApiPropertyOptional({ description: "Registration question checked by staff", example: false })
	stf_regis_question_checked?: boolean;

	@ApiPropertyOptional({ description: "Academic question checked by staff", example: false })
	stf_academic_question_checked?: boolean;

	@ApiPropertyOptional({ description: "Info note from staff", example: "รอการตรวจสอบ" })
	std_info_note?: string;

	@ApiPropertyOptional({ description: "Question result score", example: 85.5 })
	stf_question_result?: number;

	@ApiPropertyOptional({ description: "Question result detail", example: "ผ่านเกณฑ์" })
	stf_question_result_detail?: string;

	@ApiProperty({ description: "Created at timestamp" })
	created_at: Date;

	@ApiProperty({ description: "Updated at timestamp" })
	updated_at: Date;
}

export class StudentApplicationResponseDto {
	@ApiProperty({ description: "Application ID", example: "550e8400-e29b-41d4-a716-446655440000" })
	std_application_id: string;

	@ApiPropertyOptional({ description: "Application submitted status", example: false })
	std_application_submit?: boolean;

	@ApiPropertyOptional({ description: "Application confirmed status", example: false })
	std_application_confirm?: boolean;

	@ApiPropertyOptional({ description: "Abort reason if application was cancelled", example: null })
	std_application_abort_reason?: string;

	@ApiPropertyOptional({ description: "Application pass status", example: false })
	std_application_pass?: boolean;

	@ApiProperty({ description: "Application result", enum: ApplicationResult, example: "waiting_for_announcement" })
	std_application_result: ApplicationResult;

	@ApiPropertyOptional({ description: "Staff allowed confirmation", example: false })
	stf_application_allow_confirm?: boolean;

	@ApiProperty({ description: "User ID", example: "user-uuid-123" })
	std_user_id: string;

	@ApiPropertyOptional({ description: "Application info details", type: ApplicationInfoResponseDto })
	std_info?: ApplicationInfoResponseDto;

	@ApiPropertyOptional({ description: "Application files", type: [ApplicationFileResponseDto] })
	std_file?: ApplicationFileResponseDto[];

	@ApiPropertyOptional({ description: "Registration question answers", type: [ApplicationRegisQuestionAnswerResponseDto] })
	std_regis_question?: ApplicationRegisQuestionAnswerResponseDto[];

	@ApiPropertyOptional({ description: "Academic question answers", type: [ApplicationAcademicQuestionAnswerResponseDto] })
	std_academic_question?: ApplicationAcademicQuestionAnswerResponseDto[];

	@ApiPropertyOptional({ description: "Application status", type: ApplicationStatusResponseDto })
	std_status?: ApplicationStatusResponseDto;

	@ApiProperty({ description: "Created at timestamp" })
	created_at: Date;

	@ApiProperty({ description: "Updated at timestamp" })
	updated_at: Date;
}
