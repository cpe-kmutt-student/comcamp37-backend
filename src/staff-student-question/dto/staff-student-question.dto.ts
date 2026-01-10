import { IsBoolean, IsEmail, IsEnum, IsInt, IsNumber, IsNumberString, IsString, Length, Max, MaxLength, Min } from "class-validator";

export class StaffStudentQuestionGetAnswerDto {
	@IsString()
	readonly stdId: string;
}

export class StaffStudentQuestionCheckedDto {
	@IsString()
	readonly stdId: string;

	@IsNumber()
	readonly result: number;

	@IsString()
	readonly result_detail: string;
}
