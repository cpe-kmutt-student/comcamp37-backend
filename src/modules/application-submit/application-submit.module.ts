import { Module } from "@nestjs/common";
import { ApplicationSubmitController } from "./application-submit.controller";
import { ApplicationSubmitService } from "./application-submit.service";

@Module({
	controllers: [ApplicationSubmitController],
	providers: [ApplicationSubmitService],
})
export class ApplicationSubmitModule {}
