import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ApplicationConfirmationResponseDto {
	@ApiPropertyOptional({ description: "Application pass status", example: false })
	std_application_pass?: boolean;

	@ApiPropertyOptional({ description: "Abort reason if application was cancelled", example: null })
	std_application_abort_reason?: string;

	@ApiPropertyOptional({ description: "Application confirmed status", example: false })
	std_application_confirm?: boolean;

	@ApiPropertyOptional({ description: "Application submitted status", example: true })
	std_application_submit?: boolean;

	@ApiProperty({ description: "Created at timestamp" })
	created_at: Date;

	@ApiProperty({ description: "Updated at timestamp" })
	updated_at: Date;
}
