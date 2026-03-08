import { IsBoolean, IsEmail, IsString } from "class-validator";

export class StaffSendEmailDto {
	@IsString()
	email_subject: string;

	@IsString()
	email_content: string;

	@IsString()
	@IsEmail()
	email_to_email: string;

	@IsString()
	email_to_name: string;
}
