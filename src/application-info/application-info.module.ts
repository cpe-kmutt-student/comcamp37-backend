import { Module } from "@nestjs/common";
import { ApplicationInfoController } from "./application-info.controller";
import { ApplicationInfoService } from "./application-info.service";

@Module({
	controllers: [ApplicationInfoController],
	providers: [ApplicationInfoService],
})
export class ApplicationInfoModule {}
