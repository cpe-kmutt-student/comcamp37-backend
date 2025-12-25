import { Injectable } from "@nestjs/common";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../s3/s3.client";
import { config } from "src/config/app.config";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UploadService {
	// constructor(private readonly prisma: PrismaService) {}

	async upload(file: Express.Multer.File) {
		const key = `${Date.now()}-${file.originalname}`;

		console.log(file);
		await s3Client
			.send(
				new PutObjectCommand({
					Bucket: config.s3.bucket,
					Key: key,
					Body: file.buffer,
					ContentType: file.mimetype,
				}),
			)
			.catch((e) => console.log(e));

		return {
			key,
			url: await this.signedUrl(key),
		};
	}

	async signedUrl(key: string) {
		return await getSignedUrl(
			s3Client,
			new GetObjectCommand({
				Bucket: config.s3.bucket,
				Key: key,
			}),
			{ expiresIn: 60 },
		);
	}
}
