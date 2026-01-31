import { IsBoolean, IsEnum, IsString } from "class-validator";
import { AppInfoStatus } from "../../../../generated/prisma/enums";

export class AppStatusInfoCheckDto {
	@IsString()
	readonly application_id: string;

	@IsEnum(AppInfoStatus)
	readonly status: AppInfoStatus;
}

export class AppStatusCommentDto {
	@IsString()
	readonly application_id: string;

	@IsString()
	readonly comment: string;
}
