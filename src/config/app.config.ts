import dotenv from "dotenv";
dotenv.config();

export const config = {
	app: {
		port: parseInt(process.env.APP_PORT || "3000", 10),
		allowOrigins: (process.env.APP_ALLOW_ORIGIN || "").split(","),
		jwtSecret: process.env.APP_JWT_SECRET || "KEYES",
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
};
