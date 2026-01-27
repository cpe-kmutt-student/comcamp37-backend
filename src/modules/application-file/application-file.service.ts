import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { FileType } from "generated/prisma/enums";
import { config } from "src/config/app.config";
import { PrismaService } from "src/core/prisma/prisma.service";
import { S3Service } from "src/core/s3/s3.service";
import uuid from "uuid";
import { ApplicationFileDto } from "./dto/application-file.dto";

@Injectable()
export class ApplicationFileService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly s3: S3Service,
	) {}

	async getApplicationFiles(userId: string, appId: string) {
		try {
			const applicationFiles = await this.prisma.applicationFile.findMany({
				where: {
					std_application_id: appId,
					std_application: {
						std_user_id: userId,
					},
					std_file_disabled: false,
				},
				omit: {
					std_file_disabled: true,
				},
			});

			return applicationFiles.length !== 0 ? applicationFiles : new NotFoundException();
		} catch (e) {
			console.log(e);
			throw new InternalServerErrorException();
		}
	}

	async uploadApplicationFile(userId: string, applicationFileDto: ApplicationFileDto, file: Express.Multer.File) {
		try {
			const applicationFiles = await this.prisma.applicationFile.findMany({
				where: {
					std_application_id: applicationFileDto.id,
					std_application: {
						std_user_id: userId,
					},
					std_file_type: applicationFileDto.type,
					std_file_disabled: false,
				},
			});

			if (applicationFiles.length !== 0) {
				await this.prisma.applicationFile.updateMany({
					where: {
						std_application_id: applicationFileDto.id,
						std_application: {
							std_user_id: userId,
						},
						std_file_type: applicationFileDto.type,
						std_file_disabled: false,
					},
					data: {
						std_file_disabled: true,
					},
				});
			}

			const key = uuid.v4();

			await this.s3
				.send(
					new PutObjectCommand({
						Bucket: config.s3.bucket,
						Key: key,
						Body: file.buffer,
						ContentType: file.mimetype,
					}),
				)
				.catch((e) => console.log(e));

			const newApplicationFile = await this.prisma.applicationFile.create({
				data: {
					std_application_id: applicationFileDto.id,
					std_file_key: key,
					std_file_type: applicationFileDto.type,
					std_file_originalname: encodeURI(file.originalname),
					std_file_mimetype: file.mimetype,
					std_file_encoding: file.encoding,
					std_file_size: file.size,
				},
			});

			return {
				application_id: newApplicationFile.std_application_id,
				file_originalname: newApplicationFile.std_file_originalname,
				file_size: newApplicationFile.std_file_size,
				file_url: await this.signedUrl(newApplicationFile.std_file_key),
				file_type: newApplicationFile.std_file_type,
				craeted_at: newApplicationFile.created_at,
			};
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	async getApplicationFileByType(userId: string, appId: string, type: FileType) {
		try {
			const applicationFile = await this.prisma.applicationFile.findMany({
				where: {
					std_application_id: appId,
					std_application: {
						std_user_id: userId,
					},
					std_file_type: type,
					std_file_disabled: false,
				},
				omit: {
					std_file_disabled: true,
				},
			});

			return applicationFile.length !== 0
				? Promise.all(
						applicationFile.map(async (af) => ({
							application_id: af.std_application_id,
							file_originalname: af.std_file_originalname,
							file_size: af.std_file_size,
							file_url: await this.signedUrl(af.std_file_key),
							file_type: af.std_file_type,
							created_at: af.created_at,
						})),
					)
				: new NotFoundException();
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	async signedUrl(key: string | null | undefined): Promise<string | null> {
		if (!key) return null;
		return await getSignedUrl(
			this.s3,
			new GetObjectCommand({
				Bucket: config.s3.bucket,
				Key: key,
			}),
			{
				expiresIn: 30 * 60, // 30m
			},
		);
	}
}
