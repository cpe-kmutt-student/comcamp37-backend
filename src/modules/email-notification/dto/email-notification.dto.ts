import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, IsUUID } from "class-validator";

export class AnnouncementEmailDto {
	@ApiProperty({
		description: "Recipient email address",
		example: "student@example.com",
	})
	@IsEmail()
	readonly email: string;

	@ApiProperty({
		description: "Recipient name",
		example: "สมชาย ใจดี",
	})
	@IsString()
	readonly name: string;
}

export class ContentIssueEmailDto {
	@ApiProperty({
		description: "Recipient email address",
		example: "student@example.com",
	})
	@IsEmail()
	readonly email: string;

	@ApiProperty({
		description: "Recipient name",
		example: "สมชาย ใจดี",
	})
	@IsString()
	readonly name: string;

	@ApiProperty({
		description: "Issue detail description",
		example: "กรุณาแก้ไขรูปถ่ายหน้าตรง",
	})
	@IsString()
	readonly detail: string;

	@ApiPropertyOptional({
		description: "Deadline for fixing the issue",
		example: "2026-02-15",
	})
	@IsString()
	@IsOptional()
	readonly deadline?: string;
}

export class TrackingEmailDto {
	@ApiProperty({
		description: "Recipient email address",
		example: "student@example.com",
	})
	@IsEmail()
	readonly email: string;

	@ApiProperty({
		description: "Recipient name",
		example: "สมชาย ใจดี",
	})
	@IsString()
	readonly name: string;

	@ApiProperty({
		description: "Application ID (UUID)",
		example: "550e8400-e29b-41d4-a716-446655440000",
	})
	@IsUUID()
	readonly application_id: string;

	@ApiProperty({
		description: "Tracking number",
		example: "TH1234567890",
	})
	@IsString()
	readonly tracking_number: string;

	@ApiProperty({
		description: "Shipping provider name",
		example: "Thailand Post",
	})
	@IsString()
	readonly provider: string;
}
