import { Module } from "@nestjs/common";
import { ApplicationConfirmationController } from "./application-confirmation.controller";
import { ApplicationConfirmationService } from "./application-confirmation.service";

@Module({
	controllers: [ApplicationConfirmationController],
	providers: [ApplicationConfirmationService],
})
export class ApplicationConfirmationModule {}
