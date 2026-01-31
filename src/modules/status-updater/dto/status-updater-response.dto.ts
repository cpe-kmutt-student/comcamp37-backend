import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class StatusUpdaterResponseDto {
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
	std_status_acdemic_question_done: boolean;

	@ApiProperty({
		description: "Whether payment is completed",
		example: false,
	})
	std_status_payment_done: boolean;
}

export class StatusUpdaterAllResponseDto {
	@ApiProperty({
		description: "Application ID",
		example: "550e8400-e29b-41d4-a716-446655440000",
	})
	std_application_id: string;

	@ApiProperty({
		description: "User ID associated with the application",
		example: "550e8400-e29b-41d4-a716-446655440001",
	})
	std_user_id: string;

	@ApiProperty({
		description: "Whether application is submitted",
		example: false,
	})
	std_application_submit: boolean;

	@ApiProperty({
		description: "Application status details",
		type: StatusUpdaterResponseDto,
	})
	std_status: StatusUpdaterResponseDto;
}
