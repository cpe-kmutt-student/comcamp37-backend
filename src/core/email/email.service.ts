import { Injectable, Logger } from "@nestjs/common";
import { render } from "@react-email/render";
import * as nodemailer from "nodemailer";
import { config } from "src/config/app.config";
import AnnouncementEmail from "./templates/AnnouncementEmail";
import ContentIssueEmail from "./templates/ContentIssueEmail";
import RegistrationConfirmEmail from "./templates/RegistrationConfirmEmail";
import TicketCreatedEmail from "./templates/TicketCreatedEmail";
import TicketSolvedEmail from "./templates/TicketSolvedEmail";
import TrackingEmail from "./templates/TrackingEmail";

@Injectable()
export class EmailService {
	private transporter: nodemailer.Transporter;
	private readonly logger = new Logger(EmailService.name);
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: config.email.nodemailer.host,
			port: config.email.nodemailer.port,
			secure: config.email.nodemailer.secure,
			auth: {
				user: config.email.nodemailer.user,
				pass: config.email.nodemailer.pass,
			},
		});
	}

	async sendAnnouncement(email: string, name: string) {
		try {
			const html = await render(AnnouncementEmail({ name }));
			return await this.sendMail(email, "ประกาศผลการคัดเลือก ComCamp 37", html);
		} catch (error) {
			this.handleError("announcement", email, error);
		}
	}

	async sendContentIssue(email: string, name: string, issueDetail: string, deadline?: string) {
		try {
			const html = await render(ContentIssueEmail({ name, issueDetail, deadline }));
			return await this.sendMail(email, "แจ้งเตือนปัญหาเนื้อหา", html);
		} catch (error) {
			this.handleError("content issue", email, error);
		}
	}

	async sendRegistrationConfirm(email: string, name: string) {
		try {
			const html = await render(RegistrationConfirmEmail({ name }));
			return await this.sendMail(email, "ยืนยันการสมัคร ComCamp 37", html);
		} catch (error) {
			this.handleError("registration confirm", email, error);
		}
	}

	async sendTracking(email: string, name: string, orderId: string, trackingNumber: string, provider: string) {
		try {
			const html = await render(TrackingEmail({ name, orderId, trackingNumber, provider }));
			return await this.sendMail(email, "พัสดุถูกจัดส่งแล้ว!", html);
		} catch (error) {
			this.handleError("tracking", email, error);
		}
	}

	async sendTicketCreated(email: string, name: string, ticketId: string, ticketSubject: string, ticketMessage?: string) {
		try {
			const html = await render(TicketCreatedEmail({ name, ticketId, ticketSubject, ticketMessage }));
			return await this.sendMail(email, `ได้รับ Ticket #${ticketId} ของคุณแล้ว`, html);
		} catch (error) {
			this.handleError("ticket created", email, error);
		}
	}

	async sendTicketSolved(email: string, name: string, ticketId: string, ticketMessage: string, resolution?: string) {
		try {
			const html = await render(TicketSolvedEmail({ name, ticketId, ticketMessage, resolution }));
			return await this.sendMail(email, `Ticket #${ticketId} ได้รับการแก้ไขแล้ว`, html);
		} catch (error) {
			this.handleError("ticket solved", email, error);
		}
	}

	private async sendMail(to: string, subject: string, html: string) {
		const info = await this.transporter.sendMail({
			from: config.email.nodemailer.from,
			to: to,
			subject: subject,
			html: html,
		});

		this.logger.log(`Email sent to ${to} (MsgID: ${info.messageId})`);
		return { success: true, messageId: info.messageId };
	}

	private handleError(type: string, email: string, error: any) {
		this.logger.error(`Failed to send ${type} email to ${email}`, error.stack);
		throw error;
	}
}
