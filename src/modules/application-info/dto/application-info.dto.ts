import { IsBoolean, IsEmail, IsEnum, IsInt, IsNumber, IsNumberString, IsOptional, IsString, Length, Max, MaxLength, Min } from "class-validator";
import { AppInfoGender } from "../../../../generated/prisma/enums";

export class ApplicationInfoDto {
	@IsString()
	readonly prefix: string;

	@IsString()
	readonly first_name: string;

	@IsString()
	readonly last_name: string;

	@IsString()
	readonly nick_name: string;

	@IsNumber()
	@Max(20)
	@Min(14)
	readonly age: number;

	@IsString()
	readonly birthdate: string;

	@IsEnum(AppInfoGender)
	readonly gender: AppInfoGender;

	@IsString()
	@IsOptional()
	readonly sexuality?: string;

	@IsString()
	readonly religion: string;

	@IsNumberString()
	readonly phone_number: string;

	@IsString()
	readonly education_level: string;

	@IsString()
	readonly education_institute: string;

	@IsString()
	readonly education_plan: string;

	@IsString()
	readonly parent_fullname: string;

	@IsString()
	readonly parent_relation: string;

	@IsString()
	readonly parent_phone_number: string;

	@IsBoolean()
	readonly have_participated: boolean;

	@IsBoolean()
	readonly have_laptop: boolean;

	@IsBoolean()
	readonly can_participate_every_day: boolean;

	@IsString()
	readonly medical_insurance: string;

	@IsString()
	readonly chronic_disease: string;

	@IsString()
	readonly drug_allergy: string;

	@IsString()
	readonly food_allergy: string;

	@IsString()
	readonly blood_group: string;

	@IsString()
	readonly address: string;

	@IsString()
	readonly shirt_size: string;

	@IsString()
	readonly travel_plan: string;

	@IsString()
	readonly laptop_os: string;

	@IsBoolean()
	readonly have_tablet: boolean;

	@IsBoolean()
	readonly have_mouse: boolean;
}
