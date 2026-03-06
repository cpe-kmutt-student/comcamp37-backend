import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { StaffGuard } from "src/common/guards/staff.guard";
import { CreateTicketDto, StaffSolveTicketDto } from "./dto/ticket.dto";
import { TicketService } from "./ticket.service";

@Controller("/api/ticket")
export class TicketController {
	constructor(private readonly ticketService: TicketService) {}

	@Post("/create")
	createTicket(@Session() session: UserSession, @Body() createTicketDto: CreateTicketDto) {
		return this.ticketService.createTicket(session.user.id, createTicketDto);
	}

	@Get("/staff/all")
	@UseGuards(StaffGuard)
	staffGetAllTicket() {
		return this.ticketService.staffGetAllTicket();
	}

	@Post("/staff/solve")
	@UseGuards(StaffGuard)
	staffSolveTicket(@Session() session: UserSession, @Body() staffSolveTicketDto: StaffSolveTicketDto) {
		return this.ticketService.staffSolveTicket(session.user.id, staffSolveTicketDto);
	}
}
