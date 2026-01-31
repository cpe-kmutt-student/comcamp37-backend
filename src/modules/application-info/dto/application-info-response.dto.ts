import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AppInfoGender } from "../../../../generated/prisma/enums";

export class ApplicationInfoResponseDto {
	@ApiProperty({ description: "Application ID", example: "550e8400-e29b-41d4-a716-446655440000" })
	std_application_id: string;

	@ApiPropertyOptional({ description: "Prefix (นาย, นางสาว)", example: "นาย" })
	std_info_prefix?: string;

	@ApiPropertyOptional({ description: "First name", example: "สมชาย" })
	std_info_first_name?: string;

	@ApiPropertyOptional({ description: "Last name", example: "ใจดี" })
	std_info_last_name?: string;

	@ApiPropertyOptional({ description: "Nickname", example: "ชาย" })
	std_info_nick_name?: string;

	@ApiPropertyOptional({ description: "Age", example: 17 })
	std_info_age?: number;

	@ApiPropertyOptional({ description: "Birthdate", example: "2009-01-15" })
	std_info_birthdate?: string;

	@ApiPropertyOptional({ description: "Gender", enum: AppInfoGender, example: "male" })
	std_info_gender?: AppInfoGender;

	@ApiPropertyOptional({ description: "Sexuality", example: "heterosexual" })
	std_info_sexuality?: string;

	@ApiPropertyOptional({ description: "Religion", example: "พุทธ" })
	std_info_religion?: string;

	@ApiPropertyOptional({ description: "Phone number", example: "0812345678" })
	std_info_phone_number?: string;

	@ApiPropertyOptional({ description: "Education level", example: "ม.5" })
	std_info_education_level?: string;

	@ApiPropertyOptional({ description: "Education institute", example: "โรงเรียนตัวอย่าง" })
	std_info_education_institute?: string;

	@ApiPropertyOptional({ description: "Education plan", example: "วิทย์-คณิต" })
	std_info_education_plan?: string;

	@ApiPropertyOptional({ description: "Parent full name", example: "นายสมศักดิ์ ใจดี" })
	std_info_parent_fullname?: string;

	@ApiPropertyOptional({ description: "Parent relation", example: "บิดา" })
	std_info_parent_relation?: string;

	@ApiPropertyOptional({ description: "Parent phone number", example: "0898765432" })
	std_info_parent_phone_number?: string;

	@ApiPropertyOptional({ description: "Have participated in ComCamp before", example: false })
	std_info_have_participated?: boolean;

	@ApiPropertyOptional({ description: "Have laptop", example: true })
	std_info_have_laptop?: boolean;

	@ApiPropertyOptional({ description: "Can participate every day", example: true })
	std_info_can_participate_every_day?: boolean;

	@ApiPropertyOptional({ description: "Medical insurance", example: "ประกันสังคม" })
	std_info_medical_insurance?: string;

	@ApiPropertyOptional({ description: "Chronic disease", example: "ไม่มี" })
	std_info_chronic_disease?: string;

	@ApiPropertyOptional({ description: "Drug allergy", example: "ไม่มี" })
	std_info_drug_allergy?: string;

	@ApiPropertyOptional({ description: "Food allergy", example: "ไม่มี" })
	std_info_food_allergy?: string;

	@ApiPropertyOptional({ description: "Blood group", example: "O" })
	std_info_blood_group?: string;

	@ApiPropertyOptional({ description: "Address", example: "123 ถนนตัวอย่าง กรุงเทพฯ 10400" })
	std_info_address?: string;

	@ApiPropertyOptional({ description: "Shirt size", example: "M" })
	std_info_shirt_size?: string;

	@ApiPropertyOptional({ description: "Travel plan", example: "รถยนต์ส่วนตัว" })
	std_info_travel_plan?: string;

	@ApiPropertyOptional({ description: "Laptop OS", example: "Windows" })
	std_info_laptop_os?: string;

	@ApiPropertyOptional({ description: "Have tablet", example: false })
	std_info_have_tablet?: boolean;

	@ApiPropertyOptional({ description: "Have mouse", example: true })
	std_info_have_mouse?: boolean;

	@ApiProperty({ description: "Created at timestamp" })
	created_at: Date;

	@ApiProperty({ description: "Updated at timestamp" })
	updated_at: Date;
}

export class ApplicationInfoUpdateResponseDto {
	@ApiProperty({ description: "Application ID", example: "550e8400-e29b-41d4-a716-446655440000" })
	application_id: string;

	@ApiPropertyOptional({ description: "Prefix", example: "นาย" })
	prefix?: string;

	@ApiPropertyOptional({ description: "First name", example: "สมชาย" })
	first_name?: string;

	@ApiPropertyOptional({ description: "Last name", example: "ใจดี" })
	last_name?: string;

	@ApiPropertyOptional({ description: "Nickname", example: "ชาย" })
	nick_name?: string;

	@ApiPropertyOptional({ description: "Age", example: 17 })
	age?: number;

	@ApiPropertyOptional({ description: "Birthdate", example: "2009-01-15" })
	birthdate?: string;

	@ApiPropertyOptional({ description: "Gender", enum: AppInfoGender, example: "male" })
	gender?: AppInfoGender;

	@ApiPropertyOptional({ description: "Sexuality", example: "heterosexual" })
	sexuality?: string;

	@ApiPropertyOptional({ description: "Religion", example: "พุทธ" })
	religion?: string;

	@ApiPropertyOptional({ description: "Phone number", example: "0812345678" })
	phone_number?: string;

	@ApiPropertyOptional({ description: "Education level", example: "ม.5" })
	education_level?: string;

	@ApiPropertyOptional({ description: "Education institute", example: "โรงเรียนตัวอย่าง" })
	education_institute?: string;

	@ApiPropertyOptional({ description: "Education plan", example: "วิทย์-คณิต" })
	education_plan?: string;

	@ApiPropertyOptional({ description: "Parent full name", example: "นายสมศักดิ์ ใจดี" })
	parent_fullname?: string;

	@ApiPropertyOptional({ description: "Parent relation", example: "บิดา" })
	parent_relation?: string;

	@ApiPropertyOptional({ description: "Parent phone number", example: "0898765432" })
	parent_phone_number?: string;

	@ApiPropertyOptional({ description: "Have participated in ComCamp before", example: false })
	have_participated?: boolean;

	@ApiPropertyOptional({ description: "Have laptop", example: true })
	have_laptop?: boolean;

	@ApiPropertyOptional({ description: "Can participate every day", example: true })
	can_participate_every_day?: boolean;

	@ApiPropertyOptional({ description: "Medical insurance", example: "ประกันสังคม" })
	medical_insurance?: string;

	@ApiPropertyOptional({ description: "Chronic disease", example: "ไม่มี" })
	chronic_disease?: string;

	@ApiPropertyOptional({ description: "Drug allergy", example: "ไม่มี" })
	drug_allergy?: string;

	@ApiPropertyOptional({ description: "Food allergy", example: "ไม่มี" })
	food_allergy?: string;

	@ApiPropertyOptional({ description: "Blood group", example: "O" })
	blood_group?: string;

	@ApiPropertyOptional({ description: "Address", example: "123 ถนนตัวอย่าง กรุงเทพฯ 10400" })
	address?: string;

	@ApiPropertyOptional({ description: "Shirt size", example: "M" })
	shirt_size?: string;

	@ApiPropertyOptional({ description: "Travel plan", example: "รถยนต์ส่วนตัว" })
	travel_plan?: string;

	@ApiPropertyOptional({ description: "Laptop OS", example: "Windows" })
	laptop_os?: string;

	@ApiPropertyOptional({ description: "Have tablet", example: false })
	have_tablet?: boolean;

	@ApiPropertyOptional({ description: "Have mouse", example: true })
	have_mouse?: boolean;

	@ApiProperty({ description: "Created at timestamp" })
	created_at: Date;

	@ApiProperty({ description: "Updated at timestamp" })
	updated_at: Date;
}
