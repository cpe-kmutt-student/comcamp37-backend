import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Response } from "express";
import { LoggerService } from "src/core/logger/logger.service";
import { PrismaService } from "src/core/prisma/prisma.service";
import { S3Service } from "src/core/s3/s3.service";

@Injectable()
export class StudentCertificateService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly s3: S3Service,
		private readonly logger: LoggerService,
	) {}

	async getCertificatePreview(res: Response, userId: string): Promise<string> {
		try {
			const application = await this.prisma.studentApplication.findMany({
				where: {
					std_user_id: userId,
				},
			});

			const fileKey = `${application[0].std_application_id}.jpg`;

			const fileUrl = await this.s3.signedUrl(fileKey, "certificate");

			if (!fileUrl) {
				throw new NotFoundException("Cannot find this certificate in storage server");
			}

			return fileUrl;
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}

	async getCertificateFull(res: Response, userId: string) {
		try {
			const application = await this.prisma.studentApplication.findMany({
				where: {
					std_user_id: userId,
				},
			});

			const fileKey = `${application[0].std_application_id}.pdf`;

			const fileUrl = await this.s3.signedUrl(fileKey, "certificate");

			if (!fileUrl) {
				throw new NotFoundException("Cannot find this certificate in storage server");
			}

			return fileUrl;
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}
}
