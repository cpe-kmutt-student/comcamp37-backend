import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class StaffAccountResponseDto {
	@ApiProperty({
		description: "User ID",
		example: "550e8400-e29b-41d4-a716-446655440000",
	})
	id: string;

	@ApiProperty({
		description: "User name",
		example: "John Doe",
	})
	name: string;

	@ApiProperty({
		description: "User email",
		example: "staff@example.com",
	})
	email: string;

	@ApiProperty({
		description: "Email verified status",
		example: true,
	})
	emailVerified: boolean;

	@ApiProperty({
		description: "User role",
		enum: ["admin", "regis", "staff", "user"],
		example: "staff",
	})
	role: string;

	@ApiProperty({
		description: "Account creation timestamp",
		example: "2026-02-01T10:00:00.000Z",
	})
	createdAt: Date;

	@ApiProperty({
		description: "Account last update timestamp",
		example: "2026-02-01T10:00:00.000Z",
	})
	updatedAt: Date;
}

export class StaffRoleResponseDto {
	@ApiProperty({
		description: "Role name",
		enum: ["admin", "regis", "staff"],
		example: "staff",
	})
	role: string;
}

export class StaffAccountDeleteResponseDto {
	@ApiProperty({
		description: "Success status",
		example: true,
	})
	success: boolean;
}
