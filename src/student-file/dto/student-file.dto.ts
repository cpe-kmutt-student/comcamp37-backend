import { IsBoolean, IsEmail, IsEnum, IsInt, IsString, Length, Max, MaxLength, Min } from "class-validator";

export enum StudentFileType {
	FACE = "face",
	NATIONAL_ID = "national_id",
	PARENT_PERMISSION = "parent_permission",
	PP_1 = "pp_1",
	PP_7 = "pp_7",
}

export class StudentFileDto {
	@IsEnum(StudentFileType)
	readonly type: StudentFileType;
}
