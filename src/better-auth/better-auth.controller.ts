import { All, Controller, Req, Res } from "@nestjs/common";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth";
import type { Request, Response } from "express";
import { OptionalAuth } from "@thallesp/nestjs-better-auth";

@Controller("api/auth")
export class BetterAuthController {
	private readonly authHandler = toNodeHandler(auth);

	@All("*path")
	@OptionalAuth()
	async handleAuth(@Req() req: Request, @Res() res: Response) {
		return this.authHandler(req, res);
	}
}
