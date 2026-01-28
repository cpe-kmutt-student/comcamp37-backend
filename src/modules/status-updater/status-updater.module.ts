import { Module } from "@nestjs/common";
import { StatusUpdaterService } from "./status-updater.service";

@Module({
	providers: [StatusUpdaterService],
	exports: [StatusUpdaterService],
})
export class StatusUpdaterModule {}
