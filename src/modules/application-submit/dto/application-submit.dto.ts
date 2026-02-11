import { IsUUID } from "class-validator";

export class ApplicationSubmitDto {
	@IsUUID()
	readonly app_id: string;
}
