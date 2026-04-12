import fs from "node:fs";
import path from "node:path";
import { render } from "@react-email/render";
import AnnouncementEmail from "src/core/email/templates/AnnouncementEmail";
import SendLinkOpenChat from "src/core/email/templates/SendLineOpenChat";
import { MailConnector } from "test/mail/MailConnector";
import { PrismaConnector } from "test/PrismaConnector";

class SendMail extends MailConnector {
	async sendAnnouncement(email: string, nick: string, first: string, last: string) {
		try {
			const html = await render(SendLinkOpenChat({ nickname: nick, firstname: first, lastname: last }));
			return await this.sendMail(email, "LINE OpenChat สำหรับผู้เข้าร่วมค่าย ComCamp 37", html);
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
				await this.sendAnnouncement(email, nickname, firstname, lastname);

				const readlast = fs.readFileSync(path.join(__dirname, "./log/success.json"), "utf8");
				const toJson: string[] = JSON.parse(readlast);
				toJson.push(email);
				fs.writeFileSync(path.join(__dirname, "./log/success.json"), JSON.stringify(toJson, null, 2), "utf8");
				console.log(`Success : ${firstname} - ${email}`);
			} catch (e) {
				const readlast = fs.readFileSync(path.join(__dirname, "./log/error.json"), "utf8");
				const toJson: string[] = JSON.parse(readlast);
				toJson.push(email);
				fs.writeFileSync(path.join(__dirname, "./log/error.json"), JSON.stringify(toJson, null, 2), "utf8");

				console.log(`Send Email Error: ${firstname} - ${email}`, e);
			}
		}
	}
}

new SendMail().run();
