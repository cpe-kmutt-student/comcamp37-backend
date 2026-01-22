import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsEnum, IsInt, IsString, Length, Max, MaxLength, Min } from "class-validator";

export enum StudentStatusType {
	FILE_DONE = "file_done",
	INFO_DONE = "info_done",
	INFO_CHECKED = "info_checked",
	QUESTION_DONE = "question_done",
	QUESTION_CHECKED = "question_checked",
	QUESTION_RESULT = "question_result",
	QUESTION_RESULT_DETAIL = "question_result_detail",
	PAYMENT_SUCCESS = "payment_success",
}

export class StudentStatusDto {
	@IsEnum(StudentStatusType)
	readonly status: StudentStatusType;
}
