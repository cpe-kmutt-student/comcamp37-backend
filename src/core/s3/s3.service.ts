import https from "node:https";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
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
			// requestHandler: new NodeHttpHandler({
			// 	httpsAgent: new https.Agent({
			// 		rejectUnauthorized: false,
			// 	}),
			// }),
		});
	}

	async signedUrl(key: string | null | undefined, bucket?: string): Promise<string | null> {
		if (!key) return null;
		return await getSignedUrl(
			this,
			new GetObjectCommand({
				Bucket: bucket || config.s3.bucket,
				Key: key,
			}),
			{
				expiresIn: 30 * 60, // 30m
			},
		);
	}
}
