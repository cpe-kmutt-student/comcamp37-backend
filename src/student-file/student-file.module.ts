import { Module } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { S3Module } from "src/core/s3/s3.module";
import { StatusUpdateModule } from "src/status-update/status-update.module";
import { StudentFileController } from "./student-file.controller";
import { StudentFileService } from "./student-file.service";

@Module({
	imports: [StatusUpdateModule, S3Module],
	controllers: [StudentFileController],
	providers: [StudentFileService],
})
export class StudentFileModule {}
