import { Module } from "@nestjs/common";
import { S3Module } from "src/core/s3/s3.module";
import { ApplicationFileController } from "./application-file.controller";
import { ApplicationFileService } from "./application-file.service";

@Module({
	imports: [S3Module],
	controllers: [ApplicationFileController],
	providers: [ApplicationFileService],
})
export class ApplicationFileModule {}
