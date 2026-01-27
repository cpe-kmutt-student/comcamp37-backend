import { Injectable } from "@nestjs/common";
import { render } from "@react-email/render";
import * as nodemailer from "nodemailer";
import AnnouncementEmail from "./templates/Announcement";

@Injectable()
export class EmailService {
	private transporter: nodemailer.Transporter;

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.MAIL_HOST,
			port: Number(process.env.MAIL_PORT),
			secure: false,
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASS,
			},
		});
	}

	async sendResultAnnouncement(email: string, name: string) {
		try {
			const htmlContent = await render(AnnouncementEmail({ name }));

			const info = await this.transporter.sendMail({
				from: process.env.MAIL_FROM,
				to: email,
				subject: "🚀 ประกาศผลการคัดเลือก ComCamp 37",
				html: htmlContent,
			});

			console.log("Message sent: %s", info.messageId);
			return { success: true, id: info.messageId };
		} catch (error) {
			console.error(`Failed to send to ${email}:`, error);
			return { success: false, error: error.message };
		}
	}
}

/*import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { render } from '@react-email/render'; // Import render
import { AnnouncementEmail } from './templates/Announcement';

@Injectable()
export class EmailService {
  private resend = new Resend(process.env.RESEND_API_KEY);

  async sendResultAnnouncement(email: string, name: string) {
    try {
      // 1. Render React Component เป็น HTML String
      const htmlContent = await render(AnnouncementEmail({ name }));

      // 2. ส่ง HTML ไปให้ Resend
      const data = await this.resend.emails.send({
        from: 'ComCamp 37 <onboarding@resend.dev>',
        to: [email],
        subject: '🚀 ประกาศผลการคัดเลือก ComCamp 37',
        html: htmlContent, // ส่ง HTML ที่ได้จากการ Render
      });

      return { success: true, id: data.data?.id };
    } catch (error) {
      console.error(`Failed to send to ${email}:`, error);
      return { success: false, error: error.message };
    }
  }
}*/
