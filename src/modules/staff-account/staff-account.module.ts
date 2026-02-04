import { Module } from "@nestjs/common";
import { StaffAccountController } from "./staff-account.controller";
import { StaffAccountService } from "./staff-account.service";

@Module({
	controllers: [StaffAccountController],
	providers: [StaffAccountService],
})
export class StaffAccountModule {}
