import { HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { EmailService } from "src/core/email/email.service";
import { LoggerService } from "src/core/logger/logger.service";
import { PrismaService } from "src/core/prisma/prisma.service";
import { CreateTicketDto, StaffSolveTicketDto } from "./dto/ticket.dto";

@Injectable()
export class TicketService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly emailService: EmailService,
		private readonly logger: LoggerService,
	) {}

	async createTicket(userId: string, createTicketDto: CreateTicketDto) {
		try {
			const createTicket = await this.prisma.ticket.create({
				data: {
					std_user_id: userId,
					ticket_system_message: createTicketDto.system_message,
					ticket_user_message: createTicketDto.user_message,
				},
				include: {
					std_user: true,
					stf_user: true,
				},
			});

			const userInfo = await this.prisma.user.findUnique({
				where: {
					id: userId,
				},
				include: {
					std_application: {
						include: {
							std_info: true,
						},
					},
				},
			});

			if (userInfo) {
				await this.emailService.sendTicketCreated(userInfo.email, decodeURI(userInfo.std_application[0]?.std_info?.std_info_nick_name || ""), createTicket.ticket_id, "", createTicket.ticket_user_message || "-");
			}
			return createTicket;
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
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
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
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

			const userInfo = await this.prisma.user.findUnique({
				where: {
					id: ticketSolved.std_user_id,
				},
				include: {
					std_application: {
						include: {
							std_info: true,
						},
					},
				},
			});

			if (userInfo) {
				await this.emailService.sendTicketSolved(
					userInfo.email,
					decodeURI(userInfo.std_application[0]?.std_info?.std_info_nick_name || ""),
					ticketSolved.ticket_id,
					ticketSolved.ticket_user_message || "-",
					ticketSolved.stf_solve_message || "-",
				);
			}

			return ticketSolved;
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}
}
