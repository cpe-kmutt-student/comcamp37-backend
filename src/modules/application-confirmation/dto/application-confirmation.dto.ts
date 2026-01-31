import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEmail, IsInt, IsNumber, IsNumberString, IsObject, IsOptional, IsString, Length, Max, MaxLength, Min, ValidateNested } from "class-validator";

export class ApplicationConfirmationDto {
	@ApiProperty({
		description: "Application ID (UUID)",
		example: "550e8400-e29b-41d4-a716-446655440000",
	})
	@IsString()
	readonly application_id: string;

	@ApiProperty({
		description: "Confirmation status (true = confirm, false = decline)",
		example: true,
	})
	@IsBoolean()
	readonly confirm: boolean;

	@ApiPropertyOptional({
		description: "Reason for declining (required if confirm is false)",
		example: "ติดธุระไม่สามารถเข้าร่วมได้",
	})
	@IsString()
	@IsOptional()
	readonly reason?: string;
}
