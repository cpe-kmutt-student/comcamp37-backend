import { render } from "@react-email/render";
import * as nodemailer from "nodemailer";
import { config } from "src/config/app.config";
import AnnouncementEmail from "src/core/email/templates/AnnouncementEmail";

export abstract class MailConnector {
	private transporter: nodemailer.Transporter;

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

	protected async sendMail(to: string, subject: string, html: string) {
		const info = await this.transporter.sendMail({
			from: config.email.nodemailer.from,
			to: to,
			subject: subject,
			html: html,
		});

		console.log(`Email sent to ${to} (MsgID: ${info.messageId})`);
		return { success: true, messageId: info.messageId };
	}

	protected handleError(type: string, email: string, error: any) {
		console.error(`Failed to send ${type} email to ${email}`, error.stack);
		throw error;
	}
}
