import { Module } from "@nestjs/common";
import { StaffStatusUpdaterController } from "./staff-status-updater.controller";
import { StaffStatusUpdaterService } from "./staff-status-updater.service";

@Module({
	controllers: [StaffStatusUpdaterController],
	providers: [StaffStatusUpdaterService],
	exports: [StaffStatusUpdaterService],
})
export class StaffStatusUpdaterModule {}
