import { APP_PIPE } from "@nestjs/core";
import { z } from "zod";

const envBoolean = z.enum(["true", "false"]).transform((v) => v === "true");
const envDate = z.iso.datetime({ offset: true }).transform((v) => new Date(v));
const envPort = z.coerce.number().int().positive().min(1).max(65535);

const envSchema = z.object({
	DOCKER_APP_EXPOSE_PORT: envPort,
	DOCKER_PROXY_HOST: z.string().min(1),
	APP_PORT: envPort,
	APP_ALLOW_ORIGIN: z.string().transform((v) => v.split(",")),
	APP_FRONTEND_URL: z.url(),
	APP_DOMAIN: z.string().min(1),
	APP_ENV: z.enum(["PROD", "DEV"]),

	AUTH_JWT_SECRET: z.string().min(32),

	AUTH_GOOGLE_CLIENT_ID: z.string().min(1),
	AUTH_GOOGLE_CLIENT_SECRET: z.string().min(1),
	AUTH_GOOGLE_CALLBACK_URL: z.url(),

	DATABASE_URL: z.string().min(1),

	S3_REGION: z.string().min(1),
	S3_ENDPOINT: z.url(),
	S3_ACCESS_KEY: z.string().min(1),
	S3_SECRET_KEY: z.string().min(1),
	S3_BUCKET: z.string().min(1),

	BETTER_AUTH_SECRET: z.string().min(32),
	BETTER_AUTH_URL: z.url(),

	RESEND_API_KEY: z.string().min(1),
	RESEND_API_NAME: z.string().min(1),
	RESEND_API_DOMAIN: z.string().min(1),

	MAIL_HOST: z.string().min(1),
	MAIL_PORT: z.coerce.number().int().positive(),
	MAIL_USER: z.string().min(1),
	MAIL_PASS: z.string().min(1),
	MAIL_FROM: z.string().min(1),

	LOGGING_WEBHOOK_URL: z.url().optional(),

	REGISTER_PERIOD_BYPASS: envBoolean,
	REGISTER_PERIOD_START: envDate,
	REGISTER_PERIOD_END: envDate,

	RESULT_ANNOUNCE_AND_CONFIRM_PERIOD_BYPASS: envBoolean,
	RESULT_ANNOUNCE_AND_CONFIRM_PERIOD_START: envDate,
	RESULT_ANNOUNCE_AND_CONFIRM_PERIOD_END: envDate,

	API_EASYSLIP_KEY: z.string().min(1),

	PAYMENT_BYPASS: envBoolean,
	PAYMENT_AMOUNT: z.coerce.number().nonnegative(),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
	console.error(result.error.flatten());
	process.exit(1);
}

export const env = result.data;
export type Env = z.infer<typeof envSchema>;

export const config = {
	app: {
		port: env.APP_PORT,
		allowOrigins: env.APP_ALLOW_ORIGIN,
		frontendUrl: env.APP_FRONTEND_URL,
		domain: env.APP_DOMAIN,
		env: env.APP_ENV,
	},
	logging: {
		webhookUrl: env.LOGGING_WEBHOOK_URL,
	},
	regisPeriod: {
		bypass: env.REGISTER_PERIOD_BYPASS,
		start: env.REGISTER_PERIOD_START,
		end: env.REGISTER_PERIOD_END,
	},
	resultAnnounceAndConfirmPeriod: {
		bypass: env.RESULT_ANNOUNCE_AND_CONFIRM_PERIOD_BYPASS,
		start: env.RESULT_ANNOUNCE_AND_CONFIRM_PERIOD_START,
		end: env.RESULT_ANNOUNCE_AND_CONFIRM_PERIOD_END,
	},
	db: {
		url: env.DATABASE_URL,
	},
	s3: {
		region: env.S3_REGION,
		endpoint: env.S3_ENDPOINT,
		bucket: env.S3_BUCKET,
		accessKey: env.S3_ACCESS_KEY,
		secretKey: env.S3_SECRET_KEY,
	},
	auth: {
		jwtSecret: env.AUTH_JWT_SECRET,
		googleClientId: env.AUTH_GOOGLE_CLIENT_ID,
		googleClientSecret: env.AUTH_GOOGLE_CLIENT_SECRET,
		googleCallbackUrl: env.AUTH_GOOGLE_CALLBACK_URL,
	},
	email: {
		resend: {
			key: env.RESEND_API_KEY,
			name: env.RESEND_API_NAME,
			domain: env.RESEND_API_DOMAIN,
		},
		nodemailer: {
			host: env.MAIL_HOST,
			port: env.MAIL_PORT,
			user: env.MAIL_USER,
			pass: env.MAIL_PASS,
			secure: false,
			from: env.MAIL_FROM,
		},
	},
	apis: {
		slipKey: env.API_EASYSLIP_KEY,
	},
	payment: {
		bypass: env.PAYMENT_BYPASS,
		reciever: {
			name: {
				en: "MR. SIWACH G",
				th: "นาย ศิวัช ก",
			},
			account: {
				proxy: "004999224412568",
				real: "2178877804",
			},
			amount: env.PAYMENT_AMOUNT,
		},
	},
} as const;
