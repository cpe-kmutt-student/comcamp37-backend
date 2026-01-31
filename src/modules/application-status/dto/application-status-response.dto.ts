import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

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
