import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { Request, Request } from "express";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(AuthGuard)
	@Get("profile")
	getProfile(@Request() req: any) {
		return req.user;
	}
}
