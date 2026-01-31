import { ApiProperty } from "@nestjs/swagger";

export class StaffStatusResponseDto {
	@ApiProperty({
		description: "Primary key ID",
		example: "550e8400-e29b-41d4-a716-446655440000",
	})
	id: string;

	@ApiProperty({
		description: "Associated application ID",
		example: "550e8400-e29b-41d4-a716-446655440001",
	})
	std_application_id: string;

	@ApiProperty({
		description: "Whether application info is completed",
		example: true,
	})
	std_status_info_done: boolean;

	@ApiProperty({
		description: "Whether file uploads are completed",
		example: true,
	})
	std_status_file_done: boolean;

	@ApiProperty({
		description: "Whether registration questions are completed",
		example: false,
	})
	std_status_regis_question_done: boolean;

	@ApiProperty({
		description: "Whether academic questions are completed",
		example: false,
	})
	std_status_academic_question_done: boolean;

	@ApiProperty({
		description: "Whether payment is completed",
		example: false,
	})
	std_status_payment_done: boolean;

	@ApiProperty({
		description: "Note for application info",
		example: "Please update your phone number",
		nullable: true,
	})
	std_info_note: string | null;

	@ApiProperty({
		description: "Note for file uploads",
		example: null,
		nullable: true,
	})
	std_file_note: string | null;

	@ApiProperty({
		description: "Note for registration questions",
		example: null,
		nullable: true,
	})
	std_regis_question_note: string | null;

	@ApiProperty({
		description: "Note for academic questions",
		example: null,
		nullable: true,
	})
	std_academic_question_note: string | null;

	@ApiProperty({
		description: "Note for payment",
		example: null,
		nullable: true,
	})
	std_payment_note: string | null;
}

export class StaffInfoCheckResponseDto {
	@ApiProperty({
		description: "Primary key ID",
		example: "550e8400-e29b-41d4-a716-446655440000",
	})
	id: string;

	@ApiProperty({
		description: "Associated application ID",
		example: "550e8400-e29b-41d4-a716-446655440001",
	})
	std_application_id: string;

	@ApiProperty({
		description: "Staff user ID who checked",
		example: "550e8400-e29b-41d4-a716-446655440002",
	})
	stf_user_id: string;

	@ApiProperty({
		description: "Info check status",
		enum: ["pending", "approved", "rejected"],
		example: "approved",
	})
	std_info_status: string;

	@ApiProperty({
		description: "Created timestamp",
		example: "2026-01-31T10:00:00.000Z",
	})
	created_at: Date;

	@ApiProperty({
		description: "Updated timestamp",
		example: "2026-01-31T10:00:00.000Z",
	})
	updated_at: Date;
}
