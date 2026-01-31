import { ApiProperty } from "@nestjs/swagger";

export class StaffStatisticCountResponseDto {
	@ApiProperty({
		description: "Total number of users with role 'user'",
		example: 150,
	})
	user: number;

	@ApiProperty({
		description: "Total number of applications created",
		example: 120,
	})
	app: number;

	@ApiProperty({
		description: "Number of submitted applications",
		example: 100,
	})
	app_submit: number;

	@ApiProperty({
		description: "Number of applications with completed info",
		example: 95,
	})
	app_info_done: number;

	@ApiProperty({
		description: "Number of applications with completed file uploads",
		example: 90,
	})
	app_file_done: number;

	@ApiProperty({
		description: "Number of applications with completed registration questions",
		example: 85,
	})
	app_regis_question_doen: number;

	@ApiProperty({
		description: "Number of applications with completed payment",
		example: 80,
	})
	app_payment_done: number;

	@ApiProperty({
		description: "Number of male students",
		example: 70,
	})
	student_male: number;

	@ApiProperty({
		description: "Number of female students",
		example: 50,
	})
	student_female: number;
}
