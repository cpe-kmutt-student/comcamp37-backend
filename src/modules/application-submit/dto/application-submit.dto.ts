import { IsBoolean, IsUUID } from "class-validator";

export class ApplicationSubmitDto {
	@IsUUID()
	readonly application_id: string;

	@IsBoolean()
	readonly confirm: boolean;
}
