import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserRoles } from "generated/prisma/enums";

export class CreateStaffAccountDto {
	@ApiProperty({
		description: "Staff member name",
		example: "John Doe",
	})
	@IsString()
	readonly name: string;

	@ApiProperty({
		description: "Staff email address",
		example: "staff@example.com",
	})
	@IsEmail()
	readonly email: string;

	@ApiProperty({
		description: "Username for login",
		example: "johndoe",
	})
	@IsString()
	readonly username: string;

	@ApiProperty({
		description: "Password for the account",
		example: "securePassword123",
	})
	@IsString()
	readonly password: string;

	@ApiProperty({
		description: "Staff role",
		enum: UserRoles,
		example: "staff",
	})
	@IsEnum(UserRoles)
	readonly role: UserRoles;
}

export class UpdateStaffAccountDto {
	@ApiProperty({
		description: "Staff user ID (UUID)",
		example: "550e8400-e29b-41d4-a716-446655440000",
	})
	@IsString()
	@IsNotEmpty()
	readonly id: string;

	@ApiPropertyOptional({
		description: "New password (optional)",
		example: "newSecurePassword123",
	})
	@IsString()
	@IsOptional()
	readonly password?: string | undefined;

	@ApiPropertyOptional({
		description: "New role (optional)",
		enum: UserRoles,
		example: "regis",
	})
	@IsEnum(UserRoles)
	@IsOptional()
	readonly role?: UserRoles | undefined;
}

export class DeleteStaffAccountDto {
	@ApiProperty({
		description: "Staff user ID (UUID)",
		example: "550e8400-e29b-41d4-a716-446655440000",
	})
	@IsString()
	@IsNotEmpty()
	readonly id: string;

	@ApiProperty({
		description: "Confirmation flag (must be true to delete)",
		example: true,
	})
	@IsBoolean()
	readonly is_confirm: boolean;
}
