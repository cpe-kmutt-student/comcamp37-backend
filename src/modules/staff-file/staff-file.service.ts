import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { S3Service } from "src/core/s3/s3.service";

@Injectable()
export class StaffFileService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly s3: S3Service,
	) {}

	async getFileById(fileId: string) {
		try {
			const files = await this.prisma.applicationFile.findUnique({
				where: {
					std_file_key: fileId,
				},
			});

			if (!files) {
				throw new NotFoundException();
			}

			return {
				...files,
				url: await this.s3.signedUrl(files?.std_file_key),
			};
		} catch (e) {
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}

	async getFileByUserId(userId: string) {
		try {
			const userFile = await this.prisma.studentApplication.findMany({
				where: {
					std_user_id: userId,
				},
				include: {
					std_file: true,
				},
			});

			const signedUrls = await Promise.all(
				userFile.flatMap((uf) =>
					uf.std_file.map(async (sf) => ({
						...sf,
						url: await this.s3.signedUrl(sf.std_file_key),
					})),
				),
			);

			return signedUrls;
		} catch (e) {
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}

	async getFilesByApplicationId(appId: string) {
		try {
			const userFile = await this.prisma.studentApplication.findUnique({
				where: {
					std_application_id: appId,
				},
				include: {
					std_file: true,
				},
			});

			if (!userFile) {
				throw new NotFoundException("Application not found");
			}

			const signedUrls = await Promise.all(
				userFile.std_file.map(async (sf) => {
					return {
						...sf,
						url: await this.s3.signedUrl(sf.std_file_key),
					};
				}),
			);

			return signedUrls;
		} catch (e) {
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}
}
