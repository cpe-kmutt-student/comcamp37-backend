import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import type { Request } from "express";
// import { Request, Request } from "express";

interface RequestUser extends Request {
	user: string;
}

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(AuthGuard)
	@Get("profile")
	getProfile(@Req() req: RequestUser) {
		return req.user;
	}
}
