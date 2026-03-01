import { Module } from "@nestjs/common";
import { StaffFileController } from "./staff-file.controller";
import { StaffFileService } from "./staff-file.service";

@Module({
	controllers: [StaffFileController],
	providers: [StaffFileService],
})
export class StaffFileModule {}
