import { IsUUID } from "class-validator";

export class ApplicationPaymentEvidenceDto {
	@IsUUID()
	readonly application_id: string;
}
