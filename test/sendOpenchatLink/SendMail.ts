import fs from "node:fs";
import path from "node:path";
import { render } from "@react-email/render";
import AnnouncementEmail from "src/core/email/templates/AnnouncementEmail";
import { MailConnector } from "test/mail/MailConnector";
import { PrismaConnector } from "test/PrismaConnector";

class SendMail extends MailConnector {
	async sendAnnouncement(email: string, name: string) {
		try {
			const html = await render(AnnouncementEmail({ name }));
			return await this.sendMail(email, "ประกาศผลการคัดเลือก ComCamp 37", html);
		} catch (error) {
			this.handleError("announcement", email, error);
		}
	}

	async run() {
		interface EmailList {
			email: string;
			firstname: string;
			lastname: string;
			nickname: string;
		}
		const loadEmailJson = fs.readFileSync(path.join(__dirname, "./confirmed-emails.json"), "utf8");
		const emails: EmailList[] = JSON.parse(loadEmailJson);

		for (const { email, nickname, firstname, lastname } of emails) {
			try {
				await this.sendAnnouncement(email, nickname);

				const readlast = fs.readFileSync(path.join(__dirname, "./log/success.json"), "utf8");
				const toJson: string[] = JSON.parse(readlast);
				toJson.push(email);
				fs.writeFileSync(path.join(__dirname, "./log/success.json"), JSON.stringify(toJson, null, 2), "utf8");
				console.log(`Success : ${name} - ${email}`);
			} catch (e) {
				const readlast = fs.readFileSync(path.join(__dirname, "./log/error.json"), "utf8");
				const toJson: string[] = JSON.parse(readlast);
				toJson.push(email);
				fs.writeFileSync(path.join(__dirname, "./log/error.json"), JSON.stringify(toJson, null, 2), "utf8");

				console.log(`Send Email Error: ${name} - ${email}`, e);
			}
		}
	}
}

new SendMail().run();
