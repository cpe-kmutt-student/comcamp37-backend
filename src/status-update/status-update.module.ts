import { Global, Module } from "@nestjs/common";
import { StatusUpdateService } from "./status-update.service";

@Module({
	providers: [StatusUpdateService],
	exports: [StatusUpdateService],
})
export class StatusUpdateModule {}
