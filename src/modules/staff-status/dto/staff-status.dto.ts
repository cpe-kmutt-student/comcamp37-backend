import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { AppInfoGender, AppInfoStatus, ApplicationResult } from "../../../../generated/prisma/enums";

export class AppStatusInfoCheckDto {
	@ApiProperty({
		description: "Application ID (UUID)",
		example: "550e8400-e29b-41d4-a716-446655440000",
	})
	@IsString()
	readonly application_id: string;

	@ApiProperty({
		description: "Info check status",
		enum: AppInfoStatus,
		example: "approved",
	})
	@IsEnum(AppInfoStatus)
	readonly status: AppInfoStatus;
}

export class AppStatusCommentDto {
	@ApiProperty({
		description: "Application ID (UUID)",
		example: "550e8400-e29b-41d4-a716-446655440000",
	})
	@IsString()
	readonly application_id: string;

	@ApiProperty({
		description: "Comment/note for the application",
		example: "Please update your phone number",
	})
	@IsString()
	readonly comment: string;
}

export class AllowToConfirmDto {
	@IsString()
	@IsUUID()
	readonly application_id: string;

	@IsNotEmpty()
	@IsBoolean()
	readonly allow: boolean;
}

export class ChangeResultDto {
	@IsString()
	@IsUUID()
	readonly application_id: string;

	@IsEnum(ApplicationResult)
	readonly result: ApplicationResult;
}
