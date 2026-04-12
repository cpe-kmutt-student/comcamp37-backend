import { Module } from "@nestjs/common";
import { StudentCertificateController } from "./student-certificate.controller";
import { StudentCertificateService } from "./student-certificate.service";

@Module({
	controllers: [StudentCertificateController],
	providers: [StudentCertificateService],
})
export class StudentCertificateModule {}
