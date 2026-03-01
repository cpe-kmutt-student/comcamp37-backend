import { Module } from "@nestjs/common";
import { S3Module } from "src/core/s3/s3.module";
import { StaffFileController } from "./staff-file.controller";
import { StaffFileService } from "./staff-file.service";

@Module({
	controllers: [StaffFileController],
	providers: [StaffFileService],
	imports: [S3Module],
})
export class StaffFileModule {}
