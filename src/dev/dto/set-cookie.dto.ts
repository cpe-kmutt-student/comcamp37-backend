import { IsString, IsInt, Min, MaxLength } from "class-validator";

export class SetCookieDto {
	@IsString()
	readonly token: string;
}
