import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEmail, IsInt, IsNumber, IsNumberString, IsObject, IsString, Length, Max, MaxLength, Min, ValidateNested } from "class-validator";

export class AnswerItemDto {
	@IsString()
	section: string;

	@IsString()
	value: string;
}

export class AnswerQuestionDto {
	@IsString()
	readonly application_id: string;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => AnswerItemDto)
	readonly answers: AnswerItemDto[];
}
