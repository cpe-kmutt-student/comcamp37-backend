import { All, Controller, Req, Res } from "@nestjs/common";
import { OptionalAuth } from "@thallesp/nestjs-better-auth";
import { toNodeHandler } from "better-auth/node";
import type { Request, Response } from "express";
import { auth } from "../lib/auth";

@Controller("/api/auth")
export class AuthController {
	private readonly authHandler = toNodeHandler(auth);

	@All("*path")
	@OptionalAuth()
	async handleAuth(@Req() req: Request, @Res() res: Response) {
		return this.authHandler(req, res);
	}
}
