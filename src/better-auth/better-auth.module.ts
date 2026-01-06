import { Module } from "@nestjs/common";
import { BetterAuthController } from "./better-auth.controller";

@Module({
	controllers: [BetterAuthController],
})
export class BetterAuthModule {}
