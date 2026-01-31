import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AppInfoGender, ApplicationResult, FileType } from "../../../../generated/prisma/enums";

export class StaffUserResponseDto {
	@ApiProperty({ description: "User ID", example: "user-uuid-123" })
	id: string;

	@ApiProperty({ description: "User name", example: "สมชาย ใจดี" })
	name: string;

	@ApiProperty({ description: "User email", example: "somchai@example.com" })
	email: string;

	@ApiProperty({ description: "Email verified status", example: true })
	emailVerified: boolean;

	@ApiPropertyOptional({ description: "User profile image URL" })
	image?: string;

	@ApiProperty({ description: "User role", example: "user" })
	role: string;

	@ApiProperty({ description: "Created at timestamp" })
	createdAt: Date;

	@ApiProperty({ description: "Updated at timestamp" })
	updatedAt: Date;
}

export class StaffAppInfoResponseDto {
	@ApiProperty({ description: "Application ID", example: "550e8400-e29b-41d4-a716-446655440000" })
	std_application_id: string;

	@ApiPropertyOptional({ description: "Prefix", example: "นาย" })
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

	@ApiPropertyOptional({ description: "Phone number", example: "0812345678" })
	std_info_phone_number?: string;

	@ApiPropertyOptional({ description: "Education level", example: "ม.5" })
	std_info_education_level?: string;

	@ApiPropertyOptional({ description: "Education institute", example: "โรงเรียนตัวอย่าง" })
	std_info_education_institute?: string;

	@ApiProperty({ description: "Created at timestamp" })
	created_at: Date;

	@ApiProperty({ description: "Updated at timestamp" })
	updated_at: Date;
}

export class StaffAppFileResponseDto {
	@ApiProperty({ description: "Application ID", example: "550e8400-e29b-41d4-a716-446655440000" })
	std_application_id: string;

	@ApiPropertyOptional({ description: "Original file name", example: "photo.jpg" })
	std_file_originalname?: string;

	@ApiPropertyOptional({ description: "File MIME type", example: "image/jpeg" })
	std_file_mimetype?: string;

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

export class StaffScoreUserResponseDto {
	@ApiProperty({ description: "Staff user ID", example: "staff-uuid-123" })
	id: string;

	@ApiProperty({ description: "Staff name", example: "สมศักดิ์ ใจดี" })
	name: string;

	@ApiProperty({ description: "Staff email", example: "staff@example.com" })
	email: string;
}

export class StaffRegisQuestionScoreResponseDto {
	@ApiProperty({ description: "Score ID", example: 1 })
	id: number;

	@ApiProperty({ description: "Registration answer ID", example: 1 })
	std_regis_answer_id: number;

	@ApiProperty({ description: "Score count", example: 1 })
	stf_count: number;

	@ApiProperty({ description: "Score value", example: 8.5 })
	stf_score: number;

	@ApiPropertyOptional({ description: "Score comment", example: "ดีมาก" })
	stf_comment?: string;

	@ApiProperty({ description: "Staff user ID", example: "staff-uuid-123" })
	stf_user_id: string;

	@ApiPropertyOptional({ description: "Staff user details", type: StaffScoreUserResponseDto })
	stf_user?: StaffScoreUserResponseDto;

	@ApiProperty({ description: "Created at timestamp" })
	created_at: Date;

	@ApiProperty({ description: "Updated at timestamp" })
	updated_at: Date;
}

export class StaffRegisQuestionAnswerResponseDto {
	@ApiProperty({ description: "Application ID", example: "550e8400-e29b-41d4-a716-446655440000" })
	std_application_id: string;

	@ApiProperty({ description: "Registration answer ID", example: 1 })
	std_regis_answer_id: number;

	@ApiProperty({ description: "Answer section", example: "section1" })
	std_regis_answer_section: string;

	@ApiProperty({ description: "Answer content", example: "คำตอบของนักเรียน..." })
	std_regis_answer: string;

	@ApiPropertyOptional({ description: "Question scores from staff", type: [StaffRegisQuestionScoreResponseDto] })
	stf_regis_question_score?: StaffRegisQuestionScoreResponseDto[];

	@ApiProperty({ description: "Created at timestamp" })
	created_at: Date;

	@ApiProperty({ description: "Updated at timestamp" })
	updated_at: Date;
}

export class StaffAcademicQuestionScoreResponseDto {
	@ApiProperty({ description: "Score ID", example: 1 })
	id: number;

	@ApiProperty({ description: "Academic answer ID", example: 1 })
	std_academic_answer_id: number;

	@ApiProperty({ description: "Score count", example: 1 })
	stf_count: number;

	@ApiProperty({ description: "Score value", example: 9.0 })
	stf_score: number;

	@ApiProperty({ description: "Staff user ID", example: "staff-uuid-123" })
	stf_user_id: string;

	@ApiPropertyOptional({ description: "Staff user details", type: StaffScoreUserResponseDto })
	stf_user?: StaffScoreUserResponseDto;

	@ApiProperty({ description: "Created at timestamp" })
	created_at: Date;

	@ApiProperty({ description: "Updated at timestamp" })
	updated_at: Date;
}

export class StaffAcademicQuestionAnswerResponseDto {
	@ApiProperty({ description: "Application ID", example: "550e8400-e29b-41d4-a716-446655440000" })
	std_application_id: string;

	@ApiProperty({ description: "Academic answer ID", example: 1 })
	std_academic_answer_id: number;

	@ApiProperty({ description: "Answer section", example: "math" })
	std_academic_answer_section: string;

	@ApiProperty({ description: "Answer content", example: "คำตอบข้อสอบ..." })
	std_academic_answer: string;

	@ApiPropertyOptional({ description: "Question scores from staff", type: [StaffAcademicQuestionScoreResponseDto] })
	stf_academic_question_score?: StaffAcademicQuestionScoreResponseDto[];

	@ApiProperty({ description: "Created at timestamp" })
	created_at: Date;

	@ApiProperty({ description: "Updated at timestamp" })
	updated_at: Date;
}

export class StaffAppStatusResponseDto {
	@ApiProperty({ description: "Application ID", example: "550e8400-e29b-41d4-a716-446655440000" })
	std_application_id: string;

	@ApiPropertyOptional({ description: "Info section completed", example: true })
	std_status_info_done?: boolean;

	@ApiPropertyOptional({ description: "File section completed", example: true })
	std_status_file_done?: boolean;

	@ApiPropertyOptional({ description: "Registration question completed", example: true })
	std_status_regis_question_done?: boolean;

	@ApiPropertyOptional({ description: "Academic question completed", example: true })
	std_status_acdemic_question_done?: boolean;

	@ApiPropertyOptional({ description: "Payment completed", example: true })
	std_status_payment_done?: boolean;

	@ApiPropertyOptional({ description: "Registration question checked by staff", example: false })
	stf_regis_question_checked?: boolean;

	@ApiPropertyOptional({ description: "Academic question checked by staff", example: false })
	stf_academic_question_checked?: boolean;

	@ApiPropertyOptional({ description: "Question result score", example: 85.5 })
	stf_question_result?: number;

	@ApiProperty({ description: "Created at timestamp" })
	created_at: Date;

	@ApiProperty({ description: "Updated at timestamp" })
	updated_at: Date;
}

export class StaffApplicationResponseDto {
	@ApiProperty({ description: "Application ID", example: "550e8400-e29b-41d4-a716-446655440000" })
	std_application_id: string;

	@ApiPropertyOptional({ description: "Application submitted status", example: true })
	std_application_submit?: boolean;

	@ApiPropertyOptional({ description: "Application confirmed status", example: false })
	std_application_confirm?: boolean;

	@ApiPropertyOptional({ description: "Application pass status", example: false })
	std_application_pass?: boolean;

	@ApiProperty({ description: "Application result", enum: ApplicationResult, example: "waiting_for_announcement" })
	std_application_result: ApplicationResult;

	@ApiProperty({ description: "User ID", example: "user-uuid-123" })
	std_user_id: string;

	@ApiPropertyOptional({ description: "User details", type: StaffUserResponseDto })
	std_user?: StaffUserResponseDto;

	@ApiPropertyOptional({ description: "Application info details", type: StaffAppInfoResponseDto })
	std_info?: StaffAppInfoResponseDto;

	@ApiPropertyOptional({ description: "Application files", type: [StaffAppFileResponseDto] })
	std_file?: StaffAppFileResponseDto[];

	@ApiPropertyOptional({ description: "Registration question answers with scores", type: [StaffRegisQuestionAnswerResponseDto] })
	std_regis_question?: StaffRegisQuestionAnswerResponseDto[];

	@ApiPropertyOptional({ description: "Academic question answers with scores", type: [StaffAcademicQuestionAnswerResponseDto] })
	std_academic_question?: StaffAcademicQuestionAnswerResponseDto[];

	@ApiPropertyOptional({ description: "Application status", type: StaffAppStatusResponseDto })
	std_status?: StaffAppStatusResponseDto;

	@ApiProperty({ description: "Created at timestamp" })
	created_at: Date;

	@ApiProperty({ description: "Updated at timestamp" })
	updated_at: Date;
}
