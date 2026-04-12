import { Module } from "@nestjs/common";
import { EmailService } from "../email/email.service";
import { ECertificateService } from "./e-certificate.service";

@Module({
	providers: [ECertificateService],
	exports: [ECertificateService],
})
export class ECertificateModule {}
