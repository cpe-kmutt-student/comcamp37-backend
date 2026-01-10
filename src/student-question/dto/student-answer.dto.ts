import { IsBoolean, IsEmail, IsEnum, IsInt, IsNumber, IsNumberString, IsString, Length, Max, MaxLength, Min } from "class-validator";

export class StudentAnswerDto {
	@IsNumberString()
	readonly section: string;

	@IsString()
	readonly answer: string;
}
