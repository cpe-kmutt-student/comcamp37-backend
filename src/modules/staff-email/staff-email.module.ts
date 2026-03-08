import { Module } from "@nestjs/common";
import { EmailModule } from "src/core/email/email.module";
import { StaffEmailController } from "./staff-email.controller";
import { StaffEmailService } from "./staff-email.service";

@Module({
	imports: [EmailModule],
	controllers: [StaffEmailController],
	providers: [StaffEmailService],
})
export class StaffEmailModule {}
