import { Module } from "@nestjs/common";
import { StaffAcademicChaosGradingController } from "./staff-academic-chaos-grading.controller";
import { StaffAcademicChaosGradingService } from "./staff-academic-chaos-grading.service";

@Module({
	controllers: [StaffAcademicChaosGradingController],
	providers: [StaffAcademicChaosGradingService],
})
export class StaffAcademicChaosGradingModule {}
