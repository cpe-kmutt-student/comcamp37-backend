import { IsEmail, IsOptional, IsString, IsUUID } from "class-validator";

export class AnnouncementEmailDto {
	@IsEmail()
	readonly email: string;

	@IsString()
	readonly name: string;
}

export class ContentIssueEmailDto {
	@IsEmail()
	readonly email: string;

	@IsString()
	readonly name: string;

	@IsString()
	readonly detail: string;

	@IsString()
	@IsOptional()
	readonly deadline?: string;
}

export class TrackingEmailDto {
	@IsEmail()
	readonly email: string;

	@IsString()
	readonly name: string;

	@IsUUID()
	readonly application_id: string;

	@IsString()
	readonly tracking_number: string;

	@IsString()
	readonly provider: string;
}
