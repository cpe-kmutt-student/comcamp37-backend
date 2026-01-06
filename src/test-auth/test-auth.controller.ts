import { Controller, Get, Req, Res } from "@nestjs/common";
import type { Headers } from "@nestjs/common";
import { auth } from "../lib/auth";
import type { Request, Response } from "express";
import { Session, AllowAnonymous, OptionalAuth } from "@thallesp/nestjs-better-auth";
import type { UserSession } from "@thallesp/nestjs-better-auth";

@Controller("test-auth")
export class TestAuthController {
	@Get("me")
	async getProfile(@Session() session: UserSession) {
		return { user: session.user };
	}
	@Get("public")
	@AllowAnonymous() // Allow anonymous access
	async getPublic() {
		return { message: "Public route" };
	}
	@Get("optional")
	@OptionalAuth() // Authentication is optional
	async getOptional(@Session() session: UserSession) {
		return { authenticated: !!session };
	}
}
