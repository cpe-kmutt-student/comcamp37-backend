import { Module } from "@nestjs/common";
import { StaffApplicationController } from "./staff-application.controller";
import { StaffApplicationService } from "./staff-application.service";

@Module({
	controllers: [StaffApplicationController],
	providers: [StaffApplicationService],
})
export class StaffApplicationModule {}
