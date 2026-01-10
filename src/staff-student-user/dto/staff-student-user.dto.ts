import { IsBoolean, IsEmail, IsEnum, IsInt, IsNumberString, IsString, Length, Max, MaxLength, Min } from "class-validator";

export class StaffStudentGetByIdDto {
	@IsString()
	readonly id: string;
}
