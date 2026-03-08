import { IsEnum, IsNumber, IsOptional, IsString, IsUUID, Max, Min } from "class-validator";

enum SectionIndentifier {
	SECTION_1_1 = 11,
	SECTION_2_1 = 21,
	SECTION_2_2 = 22,
	SECTION_2_3 = 23,
	SECTION_3_1 = 31,
	SECTION_3_2 = 32,
	SECTION_3_3 = 33,
	SECTION_3_4 = 34,
}

export class StaffAcademicChaosGradingDto {
	@IsUUID()
	readonly application_id: string;

	@IsNumber()
	readonly answer_id: number;

	@IsEnum(SectionIndentifier)
	readonly staff_count: SectionIndentifier;

	@IsNumber()
	readonly score: number;

	// @IsString()
	// @IsOptional()
	// readonly comment?: string;
}
