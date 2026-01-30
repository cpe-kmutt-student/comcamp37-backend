import { Module } from "@nestjs/common";
import { StatusUpdaterController } from "./status-updater.controller";
import { StatusUpdaterService } from "./status-updater.service";

@Module({
	providers: [StatusUpdaterService],
	controllers: [StatusUpdaterController],
	exports: [StatusUpdaterService],
})
export class StatusUpdaterModule {}
