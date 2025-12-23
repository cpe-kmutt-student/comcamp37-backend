import { Injectable } from "@nestjs/common";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../s3/s3.client";

@Injectable()
export class UploadService {
	async upload(file: Express.Multer.File) {
		const key = `${Date.now()}-${file.originalname}`;

		await s3Client.send(
			new PutObjectCommand({
				Bucket: process.env.S3_BUCKET,
				Key: key,
				Body: file.buffer,
				ContentType: file.mimetype,
			}),
		);

		return {
			key,
			url: `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET}/${key}`,
		};
	}
}
