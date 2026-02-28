import { Module } from "@nestjs/common";
import { StaffStatusUpdaterModule } from "src/staff-status-updater/staff-status-updater.module";
import { StaffRegisGradingController } from "./staff-regis-grading.controller";
import { StaffRegisGradingService } from "./staff-regis-grading.service";

@Module({
	imports: [StaffStatusUpdaterModule],
	controllers: [StaffRegisGradingController],
	providers: [StaffRegisGradingService],
})
export class StaffRegisGradingModule {}
