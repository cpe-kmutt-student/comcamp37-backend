import { IsBoolean, IsEmail, IsEnum, IsInt, IsString, Length, Max, MaxLength, Min } from "class-validator";

export enum StudentStatusType {
	FILE = "file",
	INFO = "info",
	QUESTION = "question",
	QUESTION_RESUKT = "question_result",
}

export class StudentStatusDto {
	@IsEnum(StudentStatusType)
	readonly status: StudentStatusType;
}
