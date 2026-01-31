import { ApiProperty } from "@nestjs/swagger";

export class RegisQuestionAnswerResponseDto {
	@ApiProperty({ description: "Application ID", example: "550e8400-e29b-41d4-a716-446655440000" })
	std_application_id: string;

	@ApiProperty({ description: "Registration answer ID", example: 1 })
	std_regis_answer_id: number;

	@ApiProperty({ description: "Answer section", example: "section1" })
	std_regis_answer_section: string;

	@ApiProperty({ description: "Answer content", example: "คำตอบของนักเรียน..." })
	std_regis_answer: string;

	@ApiProperty({ description: "Created at timestamp" })
	created_at: Date;

	@ApiProperty({ description: "Updated at timestamp" })
	updated_at: Date;
}

export class AcademicQuestionAnswerResponseDto {
	@ApiProperty({ description: "Application ID", example: "550e8400-e29b-41d4-a716-446655440000" })
	std_application_id: string;

	@ApiProperty({ description: "Academic answer ID", example: 1 })
	std_academic_answer_id: number;

	@ApiProperty({ description: "Answer section", example: "math" })
	std_academic_answer_section: string;

	@ApiProperty({ description: "Answer content", example: "คำตอบข้อสอบ..." })
	std_academic_answer: string;

	@ApiProperty({ description: "Created at timestamp" })
	created_at: Date;

	@ApiProperty({ description: "Updated at timestamp" })
	updated_at: Date;
}
