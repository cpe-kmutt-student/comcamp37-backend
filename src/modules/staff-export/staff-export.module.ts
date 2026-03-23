import { Module } from "@nestjs/common";
import { S3Module } from "src/core/s3/s3.module";
import { StaffExportController } from "./staff-export.controller";
import { StaffExportService } from "./staff-export.service";

@Module({
	imports: [S3Module],
	controllers: [StaffExportController],
	providers: [StaffExportService],
})
export class StaffExportModule {}
