import { IsBoolean, IsEmail, IsEnum, IsInt, IsString, IsUUID, Length, Max, MaxLength, Min } from "class-validator";
import { FileType } from "generated/prisma/enums";

export class ApplicationFileDto {
	@IsUUID()
	readonly id: string;

	@IsEnum(FileType)
	readonly type: FileType;
}
