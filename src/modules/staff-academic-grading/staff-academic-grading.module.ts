import { Module } from "@nestjs/common";
import { StaffStatusUpdaterModule } from "../staff-status-updater/staff-status-updater.module";
import { StaffAcademicGradingController } from "./staff-academic-grading.controller";
import { StaffAcademicGradingService } from "./staff-academic-grading.service";

@Module({
	controllers: [StaffAcademicGradingController],
	providers: [StaffAcademicGradingService],
	imports: [StaffStatusUpdaterModule],
})
export class StaffAcademicGradingModule {}
