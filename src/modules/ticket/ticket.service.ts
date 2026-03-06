import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { CreateTicketDto, StaffSolveTicketDto } from "./dto/ticket.dto";

@Injectable()
export class TicketService {
	constructor(private readonly prisma: PrismaService) {}

	async createTicket(userId: string, createTicketDto: CreateTicketDto) {
		try {
			const createTicket = await this.prisma.ticket.create({
				data: {
					std_user_id: userId,
					ticket_system_message: createTicketDto.system_message,
				},
				include: {
					std_user: true,
					stf_user: true,
				},
			});

			return createTicket;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	async staffGetAllTicket() {
		try {
			const getAll = await this.prisma.ticket.findMany({
				include: {
					std_user: true,
					stf_user: true,
				},
			});
			return getAll;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	async staffSolveTicket(staffId: string, staffSolveTicketDto: StaffSolveTicketDto) {
		try {
			const ticketSolved = await this.prisma.ticket.update({
				where: {
					ticket_id: staffSolveTicketDto.ticket_id,
				},
				data: {
					ticket_solved: staffSolveTicketDto.ticket_solved,
					stf_solve_message: staffSolveTicketDto.solve_message,
					stf_user_id: staffId,
				},
				include: {
					std_user: true,
					stf_user: true,
				},
			});

			return ticketSolved;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
