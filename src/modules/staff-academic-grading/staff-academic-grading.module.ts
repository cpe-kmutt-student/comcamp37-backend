import { Module } from "@nestjs/common";
import { StaffAcademicGradingController } from "./staff-academic-grading.controller";
import { StaffAcademicGradingService } from "./staff-academic-grading.service";

@Module({
	controllers: [StaffAcademicGradingController],
	providers: [StaffAcademicGradingService],
})
export class StaffAcademicGradingModule {}
