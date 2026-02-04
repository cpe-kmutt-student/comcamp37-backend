import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserRoles } from "generated/prisma/enums";

export class CreateStaffAccountDto {
	@IsString()
	readonly name: string;

	@IsEmail()
	readonly email: string;

	@IsString()
	readonly username: string;

	@IsString()
	readonly password: string;

	@IsEnum(UserRoles)
	readonly role: UserRoles;
}

export class UpdateStaffAccountDto {
	@IsString()
	@IsNotEmpty()
	readonly id: string;

	@IsString()
	@IsOptional()
	readonly password?: string | undefined;

	@IsEnum(UserRoles)
	@IsOptional()
	readonly role?: UserRoles | undefined;
}

export class DeleteStaffAccountDto {
	@IsString()
	@IsNotEmpty()
	readonly id: string;

	@IsBoolean()
	readonly is_confirm: boolean;
}
