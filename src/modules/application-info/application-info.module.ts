import { Module } from "@nestjs/common";
import { StatusUpdaterModule } from "../status-updater/status-updater.module";
import { ApplicationInfoController } from "./application-info.controller";
import { ApplicationInfoService } from "./application-info.service";

@Module({
	imports: [StatusUpdaterModule],
	controllers: [ApplicationInfoController],
	providers: [ApplicationInfoService],
})
export class ApplicationInfoModule {}
