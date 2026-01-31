import { IsOptional, IsString, IsUUID } from "class-validator";

export class StatusUpdaterDto {
	@IsString()
	@IsUUID()
	readonly application_id: string;
}
