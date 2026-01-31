import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEmail, IsInt, IsNumber, IsNumberString, IsObject, IsOptional, IsString, Length, Max, MaxLength, Min, ValidateNested } from "class-validator";

export class ApplicationConfirmationDto {
	@IsString()
	readonly application_id: string;

	@IsBoolean()
	readonly confirm: boolean;

	@IsString()
	@IsOptional()
	readonly reason?: string;
}
