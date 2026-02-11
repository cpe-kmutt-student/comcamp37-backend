import { IsBoolean, IsEnum, IsOptional, IsString, IsUUID } from "class-validator";
import { AppInfoStatus } from "generated/prisma/enums";

export class StaffCheckApplicationDto {
	@IsUUID()
	readonly app_id: string;

	@IsEnum(AppInfoStatus)
	readonly app_status: AppInfoStatus;
}

export class StaffApplicationNoteDto {
	@IsUUID()
	readonly app_id: string;

	@IsBoolean()
	readonly is_note: boolean;

	@IsString()
	readonly app_note: string;
}
