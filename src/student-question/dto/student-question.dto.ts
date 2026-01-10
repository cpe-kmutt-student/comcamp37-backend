import { IsBoolean, IsEmail, IsEnum, IsInt, IsNumber, IsNumberString, IsString, Length, Max, MaxLength, Min } from "class-validator";

export class StudentAnswerDto {
	@IsString()
	readonly section: string;

	@IsString()
	readonly answer: string;
}

export class StudentAnswerBySectionDto {
	@IsString()
	readonly section: string;
}
