import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateTicketDto {
	@IsString()
	@IsNotEmpty()
	system_message: string;

	@IsString()
	@IsOptional()
	user_message?: string;
}

export class StaffSolveTicketDto {
	@IsUUID()
	@IsString()
	ticket_id: string;

	@IsBoolean()
	@IsOptional()
	ticket_solved?: boolean;

	@IsString()
	@IsOptional()
	solve_message?: string;
}
