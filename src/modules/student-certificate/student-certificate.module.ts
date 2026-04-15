import { Module } from "@nestjs/common";
import { S3Module } from "src/core/s3/s3.module";
import { StudentCertificateController } from "./student-certificate.controller";
import { StudentCertificateService } from "./student-certificate.service";

@Module({
	controllers: [StudentCertificateController],
	providers: [StudentCertificateService],
	imports: [S3Module],
})
export class StudentCertificateModule {}
