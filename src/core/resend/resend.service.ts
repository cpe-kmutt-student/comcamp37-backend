import { Injectable } from "@nestjs/common";
import { Resend } from "resend";
import { config } from "src/config/app.config";

@Injectable()
export class ResendService extends Resend {
	constructor() {
		super(config.email.resend.key);
	}

	async sendMail(to: string, title: string, content: string) {
		try {
			await this.emails.send({
				from: `ComCamp#37 <${config.email.resend.name}@${config.email.resend.domain}>`,
				to: to,
				subject: title,
				html: content,
			});
		} catch (e) {
			console.log(e);
		}
	}
}
