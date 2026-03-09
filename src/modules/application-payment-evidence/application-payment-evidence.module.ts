import { Module } from "@nestjs/common";
import { ApplicationPaymentEvidenceController } from "./application-payment-evidence.controller";
import { ApplicationPaymentEvidenceService } from "./application-payment-evidence.service";

@Module({
	controllers: [ApplicationPaymentEvidenceController],
	providers: [ApplicationPaymentEvidenceService],
})
export class ApplicationPaymentEvidenceModule {}
