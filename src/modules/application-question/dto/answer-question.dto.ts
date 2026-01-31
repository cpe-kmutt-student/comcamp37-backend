import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEmail, IsInt, IsNumber, IsNumberString, IsObject, IsString, Length, Max, MaxLength, Min, ValidateNested } from "class-validator";

export class AnswerItemDto {
	@ApiProperty({
		description: "Question section identifier",
		example: "section_1",
	})
	@IsString()
	section: string;

	@ApiProperty({
		description: "Answer value",
		example: "This is my answer to the question",
	})
	@IsString()
	value: string;
}

export class AnswerQuestionDto {
	@ApiProperty({
		description: "Application ID (UUID)",
		example: "550e8400-e29b-41d4-a716-446655440000",
	})
	@IsString()
	readonly application_id: string;

	@ApiProperty({
		description: "Array of answers",
		type: [AnswerItemDto],
	})
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => AnswerItemDto)
	readonly answers: AnswerItemDto[];
}
