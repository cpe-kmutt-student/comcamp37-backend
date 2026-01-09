import { S3Client } from "@aws-sdk/client-s3";
import { config } from "src/config/app.config";

export const s3Client = new S3Client({
	region: config.s3.region,
	endpoint: config.s3.endpoint,
	credentials: {
		accessKeyId: config.s3.accessKey,
		secretAccessKey: config.s3.secretKey,
	},
	forcePathStyle: true, // IMPORTANT for Supabase
});
