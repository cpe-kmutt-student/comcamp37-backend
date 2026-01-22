import { IsBoolean, IsEmail, IsEnum, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Length, Max, MaxLength, Min } from "class-validator";

export class StaffStudentGetByIdDto {
	@IsString()
	readonly id: string;
}

export class StaffStudentInfoEditDto {
	@IsString()
	@IsNotEmpty()
	readonly id: string;

	@IsString()
	@IsOptional()
	readonly prefix: string;

	@IsString()
	@IsOptional()
	readonly first_name: string;

	@IsString()
	@IsOptional()
	readonly last_name: string;

	@IsString()
	@IsOptional()
	readonly nick_name: string;

	@IsNumber()
	@Max(20)
	@Min(14)
	@IsOptional()
	readonly age: number;

	@IsString()
	@IsOptional()
	readonly birthdate: string;

	@IsString()
	@IsOptional()
	readonly gender: string;

	@IsString()
	@IsOptional()
	readonly religion: string;

	@IsNumberString()
	@IsOptional()
	readonly phone_number: string;

	@IsString()
	@IsOptional()
	readonly education_level: string;

	@IsString()
	@IsOptional()
	readonly education_institute: string;

	@IsString()
	@IsOptional()
	readonly education_plan: string;

	@IsString()
	@IsOptional()
	readonly parent_fullname: string;

	@IsString()
	@IsOptional()
	readonly parent_relation: string;

	@IsString()
	@IsOptional()
	readonly parent_phone_number: string;

	@IsBoolean()
	@IsOptional()
	readonly have_participated: boolean;

	@IsBoolean()
	@IsOptional()
	readonly have_laptop: boolean;

	@IsBoolean()
	@IsOptional()
	readonly can_participate_every_day: boolean;

	@IsString()
	@IsOptional()
	readonly medical_insurance: string;

	@IsString()
	@IsOptional()
	readonly chronic_disease: string;

	@IsString()
	@IsOptional()
	readonly drug_allergy: string;

	@IsString()
	@IsOptional()
	readonly food_allergy: string;

	@IsString()
	@IsOptional()
	readonly blood_group: string;

	@IsString()
	@IsOptional()
	readonly address: string;

	@IsString()
	@IsOptional()
	readonly shirt_size: string;

	@IsString()
	@IsOptional()
	readonly travel_plan: string;

	@IsString()
	@IsOptional()
	readonly laptop_os: string;

	@IsBoolean()
	@IsOptional()
	readonly have_tablet: boolean;

	@IsBoolean()
	@IsOptional()
	readonly have_mouse: boolean;
}
