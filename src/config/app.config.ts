import dotenv from "dotenv";

dotenv.config();

export const config = {
	app: {
		port: parseInt(process.env.APP_PORT || "3000", 10),
		allowOrigins: (process.env.APP_ALLOW_ORIGIN || "").split(","),
		frontendUrl: process.env.APP_FRONTEND_URL || "",
	},
	logging: {
		webhookUrl: process.env.LOGGING_WEBHOOK_URL,
	},
	db: {
		url: process.env.DATABASE_URL || "",
	},
	s3: {
		region: process.env.S3_REGION || "",
		endpoint: process.env.S3_ENDPOINT || "",
		bucket: process.env.S3_BUCKET || "",
		accessKey: process.env.S3_ACCESS_KEY || "",
		secretKey: process.env.S3_SECRET_KEY || "",
	},
	auth: {
		jwtSecret: process.env.AUTH_JWT_SECRET || "KEYES",
		googleClientId: process.env.AUTH_GOOGLE_CLIENT_ID || "",
		googleClientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET || "",
		googleCallbackUrl: process.env.AUTH_GOOGLE_CALLBACK_URL || "http://localhost:3030/student/google/callback",
	},
	email: {
		resend: {
			key: process.env.RESEND_API_KEY || "",
			name: process.env.RESEND_API_NAME || "",
			domain: process.env.RESEND_API_DOMAIN || "",
		},
		nodemailer: {
			host: process.env.MAIL_HOST || "",
			port: Number(process.env.MAIL_PORT || ""),
			user: process.env.MAIL_USER || "",
			pass: process.env.MAIL_PASS || "",
			secure: false,
			from: process.env.MAIL_FROM || "",
		},
	},
} as const;
