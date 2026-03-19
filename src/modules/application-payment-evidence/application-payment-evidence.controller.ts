import { Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { AnnounceAndConfirmPeriodGuard } from "src/common/guards/announce-period.guard";
import { ApplicationPassGuard } from "src/common/guards/application-pass.guard";
import { ApplicationPaymentEvidenceService } from "./application-payment-evidence.service";
import { ApplicationPaymentEvidenceDto } from "./dto/application-payment-evidence.dto";

@Controller("/api/application/payment-evidence")
export class ApplicationPaymentEvidenceController {
	constructor(private readonly applicationPaymentEvidenceService: ApplicationPaymentEvidenceService) {}

	@Post("/upload")
	@UseGuards(AnnounceAndConfirmPeriodGuard)
	@UseGuards(ApplicationPassGuard)
	@UseInterceptors(FileInterceptor("file"))
	uploadEvidence(
		@Session() session: UserSession,
		@Body() applicationPaymentEvidenceDto: ApplicationPaymentEvidenceDto,
		@UploadedFile(
			new ParseFilePipe({
				validators: [new MaxFileSizeValidator({ maxSize: 3 * 1024 * 1024 }), new FileTypeValidator({ fileType: "image/*" })],
			}),
		)
		file: Express.Multer.File,
	) {
		return this.applicationPaymentEvidenceService.uploadEvidence(session.user.id, applicationPaymentEvidenceDto, file);
	}
}
