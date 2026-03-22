import { PutObjectCommand } from "@aws-sdk/client-s3";
import { HttpException, Injectable, InternalServerErrorException, NotAcceptableException } from "@nestjs/common";
import axios, { AxiosResponse } from "axios";
import { config } from "src/config/app.config";
import { LoggerService } from "src/core/logger/logger.service";
import { PrismaService } from "src/core/prisma/prisma.service";
import { S3Service } from "src/core/s3/s3.service";
import uuid from "uuid";
import { ApplicationConfirmationService } from "../application-confirmation/application-confirmation.service";
import { MatchedAccount, RawSlip } from "./@types/VerifyBank.type";
import { ApplicationPaymentEvidenceDto } from "./dto/application-payment-evidence.dto";

interface VerifyByBase64Request {
	base64: string;
	remark?: string;
	matchAccount?: boolean;
	matchAmount?: number;
	checkDuplicate?: boolean;
}

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

@Injectable()
export class ApplicationPaymentEvidenceService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly logger: LoggerService,
		private readonly s3: S3Service,
		private readonly applicationConfirmationService: ApplicationConfirmationService,
	) {}

	async uploadEvidence(userId: string, applicationPaymentEvidenceDto: ApplicationPaymentEvidenceDto, file: Express.Multer.File) {
		try {
			const base64WithMime = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
			const verifyBankResponse: AxiosResponse<VerifyBankResponse> = await axios.post<VerifyBankResponse, AxiosResponse<VerifyBankResponse>, VerifyByBase64Request>(
				"https://api.easyslip.com/v2/verify/bank",
				{
					base64: base64WithMime,
				},
				{
					headers: {
						Authorization: `Bearer ${config.apis.slipKey}`,
						"Content-Type": "application/json",
					},
				},
			);

			if (!verifyBankResponse.data.success) throw new InternalServerErrorException(verifyBankResponse.data.message);

			if (!verifyBankResponse.data.data.rawSlip.receiver.account.name.en && !verifyBankResponse.data.data.rawSlip.receiver.account.name.th) {
				throw new NotAcceptableException(`Cannot find reciever name`);
			}

			// why krungsri send me en name as thai??????? ;-;
			if (verifyBankResponse.data.data.rawSlip.receiver.account.name.en) {
				if (verifyBankResponse.data.data.rawSlip.sender.bank.id === "025") {
					// this for a fucking Krungsri
					if (verifyBankResponse.data.data.rawSlip.receiver.account.name.en !== config.payment.reciever.name.th) {
						throw new NotAcceptableException(`Wrong reciever name en: ${verifyBankResponse.data.data.rawSlip.receiver.account.name.en}`);
					}
				} else {
					// for normal bank
					if (verifyBankResponse.data.data.rawSlip.receiver.account.name.en !== config.payment.reciever.name.en) {
						throw new NotAcceptableException(`Wrong reciever name en: ${verifyBankResponse.data.data.rawSlip.receiver.account.name.en}`);
					}
				}
			}

			if (verifyBankResponse.data.data.rawSlip.receiver.account.name.th) {
				if (verifyBankResponse.data.data.rawSlip.receiver.account.name.th !== config.payment.reciever.name.th && verifyBankResponse.data.data.rawSlip.receiver.account.name.th !== config.payment.reciever.name.en) {
					throw new NotAcceptableException(`Wrong reciever name th: ${verifyBankResponse.data.data.rawSlip.receiver.account.name.th}`);
				}
			}

			if (!verifyBankResponse.data.data.rawSlip.receiver.account.bank?.account && !verifyBankResponse.data.data.rawSlip.receiver.account.proxy?.account) {
				throw new NotAcceptableException(`Cannot find account`);
			}

			if (verifyBankResponse.data.data.rawSlip.receiver.account.bank?.account) {
				const regex = new RegExp(`^${verifyBankResponse.data.data.rawSlip.receiver.account.bank.account.toLowerCase().replace(/-/g, "").replace(/x/g, "\\d")}$`);
				if (!regex.test(config.payment.reciever.account.real)) {
					throw new NotAcceptableException(`Wrong Account: ${verifyBankResponse.data.data.rawSlip.receiver.account.bank?.account}`);
				}
				// if (verifyBankResponse.data.data.rawSlip.receiver.account.bank?.account !== config.payment.reciever.account_real) {}
			}

			if (verifyBankResponse.data.data.rawSlip.receiver.account.proxy?.account) {
				const regex = new RegExp(`^${verifyBankResponse.data.data.rawSlip.receiver.account.proxy.account.toLowerCase().replace(/-/g, "").replace(/x/g, "\\d")}$`);
				if (!regex.test(config.payment.reciever.account.proxy)) {
					throw new NotAcceptableException(`Wrong Account: ${verifyBankResponse.data.data.rawSlip.receiver.account.proxy?.account}`);
				}
				// if (verifyBankResponse.data.data.rawSlip.receiver.account.proxy.account !== config.payment.reciever.account_proxy) {}
			}

			// check isDuplicate
			const evidence = await this.prisma.applicationPaymentEvidence.count({
				where: {
					pe_transaction_ref: verifyBankResponse.data.data.rawSlip.transRef,
				},
			});

			if (evidence !== 0) {
				throw new NotAcceptableException("This evidence has been used");
			}

			const key = uuid.v4();

			const createS3File = await this.s3
				.send(
					new PutObjectCommand({
						Bucket: config.s3.bucket,
						Key: key,
						Body: file.buffer,
						ContentType: file.mimetype,
					}),
				)
				.catch((e) => {
					throw e;
				});

			const createFile = await this.prisma.applicationFile.create({
				data: {
					std_application_id: applicationPaymentEvidenceDto.application_id,
					std_file_key: key,
					std_file_type: "file_slip",
					std_file_originalname: file.originalname,
					std_file_mimetype: file.mimetype,
					std_file_encoding: file.encoding,
					std_file_size: file.size,
				},
			});

			const createEvidence = await this.prisma.applicationPaymentEvidence.create({
				data: {
					pe_transaction_ref: verifyBankResponse.data.data.rawSlip.transRef,
					pe_transaction_payload: verifyBankResponse.data.data.rawSlip.payload,
					pe_transaction_date: new Date(verifyBankResponse.data.data.rawSlip.date),

					pe_transaction_expect_amount: config.payment.reciever.amount,
					pe_transaction_actual_amount: verifyBankResponse.data.data.rawSlip.amount.amount,

					pe_json: JSON.stringify(verifyBankResponse.data),

					pe_sender_account_name: verifyBankResponse.data.data.rawSlip.sender.account.name.en || verifyBankResponse.data.data.rawSlip.sender.account.name.th || "",
					pe_sender_account_number: verifyBankResponse.data.data.rawSlip.sender.account.proxy?.account || "",

					pe_sender_bank_id: verifyBankResponse.data.data.rawSlip.sender.bank?.id,
					pe_sender_bank_name: verifyBankResponse.data.data.rawSlip.sender.bank?.name,

					pe_reciever_account_name: verifyBankResponse.data.data.rawSlip.receiver.account.name.en || verifyBankResponse.data.data.rawSlip.receiver.account.name.th || "",
					pe_reciever_account_number: verifyBankResponse.data.data.rawSlip.receiver.account.proxy?.account || "",

					pe_reciever_bank_id: verifyBankResponse.data.data.rawSlip.receiver.bank?.id || "",
					pe_reciever_bank_name: verifyBankResponse.data.data.rawSlip.receiver.bank?.name || "",

					std_file_key: createFile.std_file_key,
					std_application_id: createFile.std_application_id,
				},
			});

			if ((await this.paymentStatusUpdater(userId, applicationPaymentEvidenceDto.application_id)) === false) {
				throw new NotAcceptableException(`Wrong amount: ${verifyBankResponse.data.data.rawSlip.amount.amount}`);
			}

			await this.confirmUpdater(userId, applicationPaymentEvidenceDto.application_id);

			const updatedEvidence = await this.prisma.applicationPaymentEvidence.findMany({
				where: {
					std_application_id: applicationPaymentEvidenceDto.application_id,
					std_application: {
						std_user_id: userId,
					},
				},
				include: {
					std_file: true,
				},
			});

			return updatedEvidence;
		} catch (e) {
			console.log(e);
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}

	private async paymentStatusUpdater(userId: string, application_id: string) {
		const findEvidence = await this.prisma.applicationPaymentEvidence.findMany({
			where: {
				std_application_id: application_id,
				std_application: {
					std_user_id: userId,
				},
			},
		});

		if (findEvidence.length === 0) return false;

		const totalAmount = findEvidence.map((evd) => evd.pe_transaction_actual_amount).reduce((a: number, b: number) => a + b) ?? 0;
		console.log(totalAmount);
		if (totalAmount < config.payment.reciever.amount) return false;

		await this.prisma.applicationStatus.update({
			where: {
				std_application_id: application_id,
				std_application: {
					std_user_id: userId,
				},
			},
			data: {
				std_status_payment_done: true,
			},
		});
		return true;
	}

	private async confirmUpdater(userId: string, application_id: string) {
		await this.applicationConfirmationService.isConfirmApplication(userId, { application_id: application_id, confirm: true, reason: "" });
	}
}
