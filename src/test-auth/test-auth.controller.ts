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
	async getPublic(@Session() session: UserSession) {
		// return { message: "Public route" };
		return { authenticated: !!session };
	}
	@Get("optional")
	@OptionalAuth() // Authentication is optional
	async getOptional(@Session() session: UserSession) {
		return { authenticated: !!session };
	}

	@Get("/create-user")
	@AllowAnonymous()
	async create() {
		// const data = await auth.api.signUpEmail({
		// 	body: {
		// 		email: "email1@domain.com",
		// 		name: "Test User",
		// 		password: "password1234",
		// 		username: "test1",
		// 		displayUsername: "Test User123",
		// 	},
		// });

		const data = await auth.api.signInUsername({
			body: {
				username: "test1",
				password: "password1234",
			},
		});

		return auth.api.getAccessToken({
			body: {
				providerId: "credential",
			},
		});
	}
}
