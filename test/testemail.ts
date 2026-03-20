import { render } from "@react-email/render";
import * as nodemailer from "nodemailer";
import { config } from "src/config/app.config";
import AnnouncementEmail from "src/core/email/templates/AnnouncementEmail";

class TestEmail {
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

	async sendAnnouncement(email: string, name: string) {
		try {
			const html = await render(AnnouncementEmail({ name }));
			return await this.sendMail(email, "ประกาศผลการคัดเลือก ComCamp 37", html);
		} catch (error) {
			this.handleError("announcement", email, error);
		}
	}

	private async sendMail(to: string, subject: string, html: string) {
		const info = await this.transporter.sendMail({
			from: config.email.nodemailer.from,
			to: to,
			subject: subject,
			html: html,
		});

		console.log(`Email sent to ${to} (MsgID: ${info.messageId})`);
		return { success: true, messageId: info.messageId };
	}

	private handleError(type: string, email: string, error: any) {
		console.error(`Failed to send ${type} email to ${email}`, error.stack);
		throw error;
	}
}

new TestEmail().sendAnnouncement("warintron152521@gmail.com", "Nong gay");
