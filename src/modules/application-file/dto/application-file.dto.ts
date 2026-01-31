import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsEnum, IsInt, IsString, IsUUID, Length, Max, MaxLength, Min } from "class-validator";
import { FileType } from "generated/prisma/enums";

export class ApplicationFileDto {
	@ApiProperty({
		description: "Application ID (UUID)",
		example: "550e8400-e29b-41d4-a716-446655440000",
	})
	@IsUUID()
	readonly id: string;

	@ApiProperty({
		description: "File type",
		enum: FileType,
		example: "file_face",
	})
	@IsEnum(FileType)
	readonly type: FileType;
}
