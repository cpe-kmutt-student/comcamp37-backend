import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { config } from "src/config/app.config";

@Injectable()
export class StudentGoogleStrategy extends PassportStrategy(
	Strategy,
	"google",
) {
	constructor() {
		super({
			clientID: config.auth.googleClientId,
			clientSecret: config.auth.googleClientSecret,
			callbackURL: "http://localhost:3030/student/google/callback",
			scope: ["email", "profile"],
		});
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: any,
		done: VerifyCallback,
	): Promise<any> {
		done(null, {
			profile,
			accessToken,
			refreshToken,
		});
	}
}
