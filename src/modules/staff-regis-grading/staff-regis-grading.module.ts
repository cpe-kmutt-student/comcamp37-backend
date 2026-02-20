import { Module } from "@nestjs/common";
import { StaffRegisGradingController } from "./staff-regis-grading.controller";
import { StaffRegisGradingService } from "./staff-regis-grading.service";

@Module({
	controllers: [StaffRegisGradingController],
	providers: [StaffRegisGradingService],
})
export class StaffRegisGradingModule {}
