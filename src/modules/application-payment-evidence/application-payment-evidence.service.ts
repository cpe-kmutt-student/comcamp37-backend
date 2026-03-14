import { PutObjectCommand } from "@aws-sdk/client-s3";
import { HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import axios, { AxiosResponse } from "axios";
import { config } from "src/config/app.config";
import { LoggerService } from "src/core/logger/logger.service";
import { PrismaService } from "src/core/prisma/prisma.service";
import { S3Service } from "src/core/s3/s3.service";
import uuid from "uuid";
import { ApplicationPaymentEvidenceDto } from "./dto/application-payment-evidence.dto";

export interface SlipVerificationBankInfo {
	id: string;
	name: string;
}

export interface SlipVerificationBankAccount {
	account: string | null;
}

export interface SlipVerificationProxyAccount {
	type: string;
	account: string;
}

export interface SlipVerificationAccountInfo {
	name: string;
	bank: SlipVerificationBankAccount;
	proxy?: SlipVerificationProxyAccount;
}

export interface SlipVerificationParty {
	account: SlipVerificationAccountInfo;
	bank: SlipVerificationBankInfo;
}

export interface SlipVerificationData {
	transRef: string;
	dateTime: string;
	amount: number;
	ref1: string;
	ref2: string;
	ref3: string;
	receiver: SlipVerificationParty;
	sender: SlipVerificationParty;
	decode: string;
	referenceId: string;
}

export interface SlipVerificationResponse {
	code: string;
	message: string;
	data: SlipVerificationData;
}

@Injectable()
export class ApplicationPaymentEvidenceService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly logger: LoggerService,
		private readonly s3: S3Service,
	) {}

	async uploadEvidence(userId: string, applicationPaymentEvidenceDto: ApplicationPaymentEvidenceDto, file: Express.Multer.File) {
		try {
			// upload slip allow to access by url
			const key = uuid.v4();
			await this.s3.send(
				new PutObjectCommand({
					Bucket: config.s3.bucket,
					Key: key,
					Body: file.buffer,
					ContentType: file.mimetype,
				}),
			);

			const slipVerificationResponse: AxiosResponse<SlipVerificationResponse> = await axios.post(
				"https://connect.slip2go.com/api/verify-slip/qr-image-link/info",
				{
					payload: {
						imageUrl: await this.s3.signedUrl(key),
					},
				},
				{
					headers: {
						Authorization: `Bearer ${config.apis.slip2goKey}`,
					},
				},
			);

			console.dir(slipVerificationResponse.data.data);

			// const newApplicationEvidenceFile = await this.prisma.applicationFile.create({
			// 	data: {
			// 		std_application_id: applicationPaymentEvidenceDto.application_id,
			// 		std_file_key: key,
			// 		std_file_type: "file_slip",
			// 		std_file_originalname: file.originalname,
			// 		std_file_mimetype: file.mimetype,
			// 		std_file_encoding: file.encoding,
			// 		std_file_size: file.size,
			// 	},
			// });
		} catch (e) {
			console.log(e);
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}
}
