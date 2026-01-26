import { Module } from "@nestjs/common";
import { ApplicationStatusController } from "./application-status.controller";
import { ApplicationStatusService } from "./application-status.service";

@Module({
	controllers: [ApplicationStatusController],
	providers: [ApplicationStatusService],
})
export class ApplicationStatusModule {}
