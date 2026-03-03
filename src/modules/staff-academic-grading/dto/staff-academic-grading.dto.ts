import { IsNumber, IsOptional, IsString, IsUUID, Max, Min } from "class-validator";

export class StaffAcademicGradingDto {
	@IsUUID()
	readonly application_id: string;

	@IsNumber()
	readonly answer_id: number;

	// @IsNumber()
	// @Max(2)
	// @Min(1)
	// readonly staff_count: number;

	@IsNumber()
	readonly score: number;

	// @IsString()
	// @IsOptional()
	// readonly comment?: string;
}
