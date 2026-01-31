import { Module } from "@nestjs/common";
import { StaffStatusController } from "./staff-status.controller";
import { StaffStatusService } from "./staff-status.service";

@Module({
	controllers: [StaffStatusController],
	providers: [StaffStatusService],
})
export class StaffStatusModule {}
