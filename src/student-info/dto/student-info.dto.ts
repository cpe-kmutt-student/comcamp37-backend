import { IsString, IsInt, Min, MaxLength, Max, Length, IsEmail, IsBoolean } from "class-validator";

export class StudentInfoDto {
    @IsString()
    readonly nickname: string;

    @IsString()
    readonly firstname: string;

    @IsString()
    readonly lastname: string;

    @IsInt()
    @Min(14)
    @Max(20)
    readonly age: number;

    @IsString()
    readonly gender: string;

    @IsString()
    readonly religion: string;

    @IsString()
    readonly blood_group: string;

    @IsString()
    readonly education_level: string;

    @IsString()
    readonly education_plan: string;

    @IsString()
    @Length(10, 10)
    readonly phone_number: string;

    @IsString()
    @IsEmail()
    readonly alternative_email: string;

    @IsString()
    readonly medical_insurance: string;

    @IsString()
    readonly chronic_disease: string;

    @IsString()
    readonly drug_allergy: string;

    @IsString()
    readonly food_allergy: string;

    @IsString()
    readonly address: string;

    @IsString()
    @Length(10, 10)
    readonly home_phone_number: string;

    @IsBoolean()
    readonly have_participated: boolean;

    @IsString()
    readonly shirt_size: string;

    @IsBoolean()
    readonly have_laptop: boolean;

    @IsString()
    readonly travel_plan: string;

    @IsString()
    readonly parent_fullname: string;

    @IsString()
    readonly parent_relation: string;

    @IsString()
    @Length(10, 10)
    readonly parent_phone: string;

    @IsString()
    readonly food_prefer: string;

    @IsBoolean()
    readonly can_participate_every_day: boolean;
}
