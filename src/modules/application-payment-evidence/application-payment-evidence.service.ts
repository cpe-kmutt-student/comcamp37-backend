import { PutObjectCommand } from "@aws-sdk/client-s3";
import { HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import axios, { AxiosResponse } from "axios";
import { config } from "src/config/app.config";
import { LoggerService } from "src/core/logger/logger.service";
import { PrismaService } from "src/core/prisma/prisma.service";
import { S3Service } from "src/core/s3/s3.service";
import uuid from "uuid";
import { MatchedAccount, RawSlip } from "./@types/VerifyBank.type";
import { ApplicationPaymentEvidenceDto } from "./dto/application-payment-evidence.dto";

// Request
interface VerifyByBase64Request {
	base64: string; // Base64 encoded image
	remark?: string; // 1-255 chars
	matchAccount?: boolean;
	matchAmount?: number;
	checkDuplicate?: boolean;
}

// Response
interface VerifyBankResponse {
	success: true;
	data: VerifyBankData;
	message: string;
}

interface VerifyBankData {
	remark?: string;
	isDuplicate: boolean;
	matchedAccount: MatchedAccount | null;
	amountInOrder?: number;
	amountInSlip: number;
	isAmountMatched?: boolean;
	rawSlip: RawSlip;
}

// See POST /verify/bank for full type definitions

@Injectable()
export class ApplicationPaymentEvidenceService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly logger: LoggerService,
		private readonly s3: S3Service,
	) {}

	async uploadEvidence(userId: string, applicationPaymentEvidenceDto: ApplicationPaymentEvidenceDto, file: Express.Multer.File) {
		try {
			// const verifyBankResponse: AxiosResponse<VerifyBankResponse> = await axios.post<VerifyBankResponse, AxiosResponse<VerifyBankResponse>, VerifyByBase64Request>("https://api.easyslip.com/v2/verify/bank", {
			// 	base64: "file.buffer.toString('base64')"
			// }, {
			// 	headers: {
			// 		"Authorization": `Bearer ${config.apis.slipKey}`,
			// 		"Content-Type": "application/json"
			// 	}
			// });

			// const response = await fetch('https://api.easyslip.com/v2/info', {
			// 	method: 'GET',
			// 	headers: {
			// 		'Authorization': `Bearer ${config.apis.slipKey}`,
			// 		'Content-Type': 'application/json'
			// 	},
			// 	body: JSON.stringify({ base64: file.buffer.toString("base64") })
			// });

			const response = await fetch("https://api.easyslip.com/v2/info", {
				headers: {
					Authorization: `Bearer ${config.apis.slipKey}`,
				},
			});

			const result = await response.json();
			console.log(result.data);
		} catch (e) {
			console.log(e);
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}

	// async uploadEvidence(userId: string, applicationPaymentEvidenceDto: ApplicationPaymentEvidenceDto, file: Express.Multer.File) {
	// 	try {
	// 		// upload slip allow to access by url
	// 		const key = uuid.v4();
	// 		await this.s3.send(
	// 			new PutObjectCommand({
	// 				Bucket: config.s3.bucket,
	// 				Key: key,
	// 				Body: file.buffer,
	// 				ContentType: file.mimetype,
	// 			}),
	// 		);

	// 		const slipVerificationResponse: AxiosResponse<SlipVerificationResponse> = await axios.post(
	// 			"https://connect.slip2go.com/api/verify-slip/qr-image-link/info",
	// 			{
	// 				payload: {
	// 					imageUrl: await this.s3.signedUrl(key),
	// 				},
	// 			},
	// 			{
	// 				headers: {
	// 					Authorization: `Bearer ${config.apis.slip2goKey}`,
	// 				},
	// 			},
	// 		);

	// 		console.dir(slipVerificationResponse.data.data);

	// 		// const newApplicationEvidenceFile = await this.prisma.applicationFile.create({
	// 		// 	data: {
	// 		// 		std_application_id: applicationPaymentEvidenceDto.application_id,
	// 		// 		std_file_key: key,
	// 		// 		std_file_type: "file_slip",
	// 		// 		std_file_originalname: file.originalname,
	// 		// 		std_file_mimetype: file.mimetype,
	// 		// 		std_file_encoding: file.encoding,
	// 		// 		std_file_size: file.size,
	// 		// 	},
	// 		// });
	// 	} catch (e) {
	// 		console.log(e);
	// 		this.logger.error(e);
	// 		if (e instanceof HttpException) {
	// 			throw e;
	// 		}

	// 		throw new InternalServerErrorException(e);
	// 	}
	// }
}
