import { Injectable } from "@nestjs/common";
import { ConfigService as EnvService } from "@nestjs/config";

@Injectable()
export class ConfigService {
	constructor(private readonly env: EnvService) {}

	public get app() {
		return {
			port: this.env.get<number>("APP_PORT", 3000),
			allowOrigins: this.env.get<string>("APP_ALLOW_ORIGIN", "").split(","),
			frontendUrl: this.env.get<string>("APP_FRONTEND_URL", ""),
		};
	}

	public get db() {
		return {
			url: this.env.get<string>("DATABASE_URL", ""),
		};
	}

	public get s3() {
		return {
			region: this.env.get<string>("S3_REGION", ""),
			endpoint: this.env.get<string>("S3_ENDPOINT", ""),
			bucket: this.env.get<string>("S3_BUCKET", ""),
			accessKey: this.env.get<string>("S3_ACCESS_KEY", ""),
			secretKey: this.env.get<string>("S3_SECRET_KEY", ""),
		};
	}

	public get auth() {
		return {
			jwtSecret: this.env.get<string>("AUTH_JWT_SECRET", "KEYES"),
			googleClientId: this.env.get<string>("AUTH_GOOGLE_CLIENT_ID", ""),
			googleClientSecret: this.env.get<string>("AUTH_GOOGLE_CLIENT_SECRET", ""),
			googleCallbackUrl: this.env.get<string>("AUTH_GOOGLE_CALLBACK_URL", "http://localhost:3030/student/google/callback"),
		};
	}

	public get mail() {
		return {
			resend_key: this.env.get<string>("RESEND_API_KEY", "KEYES"),
			resend_name: this.env.get<string>("RESEND_API_NAME", "KEYES"),
			resend_domain: this.env.get<string>("RESEND_API_DOMAIN", "KEYES"),
		};
	}
}
