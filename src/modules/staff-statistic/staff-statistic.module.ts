import { Module } from "@nestjs/common";
import { StaffStatisticController } from "./staff-statistic.controller";
import { StaffStatisticService } from "./staff-statistic.service";

@Module({
	controllers: [StaffStatisticController],
	providers: [StaffStatisticService],
})
export class StaffStatisticModule {}
