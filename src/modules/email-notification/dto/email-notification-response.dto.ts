import { ApiProperty } from "@nestjs/swagger";

export class EmailNotificationResponseDto {
	@ApiProperty({ description: "Email send status", example: true })
	success: boolean;

	@ApiProperty({ description: "Message ID from email provider", example: "abc123" })
	messageId?: string;
}
