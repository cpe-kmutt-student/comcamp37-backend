import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsEnum, IsInt, IsNumber, IsNumberString, IsOptional, IsString, Length, Max, MaxLength, Min } from "class-validator";
import { AppInfoGender } from "../../../../generated/prisma/enums";

export class ApplicationInfoDto {
	@ApiProperty({
		description: "Name prefix (e.g., Mr., Ms., Mrs.)",
		example: "นาย",
	})
	@IsString()
	readonly prefix: string;

	@ApiProperty({
		description: "First name",
		example: "สมชาย",
	})
	@IsString()
	readonly first_name: string;

	@ApiProperty({
		description: "Last name",
		example: "ใจดี",
	})
	@IsString()
	readonly last_name: string;

	@ApiProperty({
		description: "Nickname",
		example: "ชาย",
	})
	@IsString()
	readonly nick_name: string;

	@ApiProperty({
		description: "Age (14-20 years)",
		example: 16,
		minimum: 14,
		maximum: 20,
	})
	@IsNumber()
	@Max(20)
	@Min(14)
	readonly age: number;

	@ApiProperty({
		description: "Birthdate in string format",
		example: "2009-05-15",
	})
	@IsString()
	readonly birthdate: string;

	@ApiProperty({
		description: "Gender",
		enum: AppInfoGender,
		example: "male",
	})
	@IsEnum(AppInfoGender)
	readonly gender: AppInfoGender;

	@ApiPropertyOptional({
		description: "Sexuality (optional)",
		example: "heterosexual",
	})
	@IsString()
	@IsOptional()
	readonly sexuality?: string;

	@ApiProperty({
		description: "Religion",
		example: "พุทธ",
	})
	@IsString()
	readonly religion: string;

	@ApiProperty({
		description: "Phone number",
		example: "0812345678",
	})
	@IsNumberString()
	readonly phone_number: string;

	@ApiProperty({
		description: "Education level",
		example: "มัธยมศึกษาปีที่ 4",
	})
	@IsString()
	readonly education_level: string;

	@ApiProperty({
		description: "Education institute name",
		example: "โรงเรียนสวนกุหลาบวิทยาลัย",
	})
	@IsString()
	readonly education_institute: string;

	@ApiProperty({
		description: "Education plan/program",
		example: "วิทย์-คณิต",
	})
	@IsString()
	readonly education_plan: string;

	@ApiProperty({
		description: "Parent full name",
		example: "นายสมศักดิ์ ใจดี",
	})
	@IsString()
	readonly parent_fullname: string;

	@ApiProperty({
		description: "Parent relation to student",
		example: "บิดา",
	})
	@IsString()
	readonly parent_relation: string;

	@ApiProperty({
		description: "Parent phone number",
		example: "0891234567",
	})
	@IsString()
	readonly parent_phone_number: string;

	@ApiProperty({
		description: "Has participated in ComCamp before",
		example: false,
	})
	@IsBoolean()
	readonly have_participated: boolean;

	@ApiProperty({
		description: "Has a laptop",
		example: true,
	})
	@IsBoolean()
	readonly have_laptop: boolean;

	@ApiProperty({
		description: "Can participate every day of the camp",
		example: true,
	})
	@IsBoolean()
	readonly can_participate_every_day: boolean;

	@ApiProperty({
		description: "Medical insurance information",
		example: "ประกันสังคม",
	})
	@IsString()
	readonly medical_insurance: string;

	@ApiProperty({
		description: "Chronic disease information",
		example: "ไม่มี",
	})
	@IsString()
	readonly chronic_disease: string;

	@ApiProperty({
		description: "Drug allergy information",
		example: "ไม่มี",
	})
	@IsString()
	readonly drug_allergy: string;

	@ApiProperty({
		description: "Food allergy information",
		example: "ไม่มี",
	})
	@IsString()
	readonly food_allergy: string;

	@ApiProperty({
		description: "Blood group",
		example: "O",
	})
	@IsString()
	readonly blood_group: string;

	@ApiProperty({
		description: "Home address",
		example: "123/45 ถนนพระราม 4 แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110",
	})
	@IsString()
	readonly address: string;

	@ApiProperty({
		description: "Shirt size",
		example: "M",
	})
	@IsString()
	readonly shirt_size: string;

	@ApiProperty({
		description: "Travel plan to the camp",
		example: "รถไฟฟ้า BTS",
	})
	@IsString()
	readonly travel_plan: string;

	@ApiProperty({
		description: "Laptop operating system",
		example: "Windows 11",
	})
	@IsString()
	readonly laptop_os: string;

	@ApiProperty({
		description: "Has a tablet",
		example: false,
	})
	@IsBoolean()
	readonly have_tablet: boolean;

	@ApiProperty({
		description: "Has a mouse",
		example: true,
	})
	@IsBoolean()
	readonly have_mouse: boolean;
}
