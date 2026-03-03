import { Module } from "@nestjs/common";
import { StaffStatusUpdaterModule } from "../staff-status-updater/staff-status-updater.module";
import { StaffAcademicChaosGradingController } from "./staff-academic-chaos-grading.controller";
import { StaffAcademicChaosGradingService } from "./staff-academic-chaos-grading.service";

@Module({
	controllers: [StaffAcademicChaosGradingController],
	providers: [StaffAcademicChaosGradingService],
	imports: [StaffStatusUpdaterModule],
})
export class StaffAcademicChaosGradingModule {}
