import { S3Client } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { config } from "src/config/app.config";

@Injectable()
export class S3Service extends S3Client {
	constructor() {
		super({
			region: config.s3.region,
			endpoint: config.s3.endpoint,
			credentials: {
				accessKeyId: config.s3.accessKey,
				secretAccessKey: config.s3.secretKey,
			},
			forcePathStyle: true, // IMPORTANT for Supabase
		});
	}
}
