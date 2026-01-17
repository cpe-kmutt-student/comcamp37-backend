import { Controller, Get } from "@nestjs/common";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

@Controller("/api/send-mail")
export class SendMailController {
	@Get("/test")
	async sendTest() {
		console.log(
			await resend.emails.send({
				from: `no-reply@send.mail.comcamp.io`,
				to: ["Im_Just_Non@hotmail.com"],
				subject: "title",
				react: "asd",
			}),
		);
	}
}
