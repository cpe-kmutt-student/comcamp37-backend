import { Injectable } from "@nestjs/common";
import { Resend } from "resend";
import { config } from "src/config/app.config";

@Injectable()
export class SendMailService extends Resend {
	constructor() {
		super(config.mail.resend_key);
	}

	async sendTest() {
		await this.emails.send({
			from: `no-reply@send.mail.comcamp.io`,
			to: ["Im_Just_Non@hotmail.com"],
			subject: "title",
			react: "asd",
		});
	}
}
