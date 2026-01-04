import type { Request } from "express";

export interface StudentUserId extends Express.User {
	std_user_id: string;
	std_user_email: string;
}
