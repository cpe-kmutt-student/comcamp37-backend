import { Module } from "@nestjs/common";
import { S3Module } from "src/core/s3/s3.module";
import { ApplicationConfirmationModule } from "../application-confirmation/application-confirmation.module";
import { ApplicationPaymentEvidenceController } from "./application-payment-evidence.controller";
import { ApplicationPaymentEvidenceService } from "./application-payment-evidence.service";

@Module({
	imports: [S3Module, ApplicationConfirmationModule],
	controllers: [ApplicationPaymentEvidenceController],
	providers: [ApplicationPaymentEvidenceService],
})
export class ApplicationPaymentEvidenceModule {}
