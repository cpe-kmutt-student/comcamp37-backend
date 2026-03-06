import { Module } from "@nestjs/common";
import { EmailModule } from "src/core/email/email.module";
import { TicketController } from "./ticket.controller";
import { TicketService } from "./ticket.service";

@Module({
	imports: [EmailModule],
	providers: [TicketService],
	controllers: [TicketController],
})
export class TicketModule {}
