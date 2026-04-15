import { Controller, Get, Query, Res, UseGuards } from "@nestjs/common";
import { AllowAnonymous, Session, type UserSession } from "@thallesp/nestjs-better-auth";
import axios from "axios";
import { type Response } from "express";
import { UserParticipatedGuard } from "src/common/guards/user-particicated.guard";
import { StudentCertificateService } from "./student-certificate.service";

@Controller("/api/student/certificate")
export class StudentCertificateController {
	constructor(private readonly studentCertificateService: StudentCertificateService) {}

	@Get("/preview")
	@UseGuards(UserParticipatedGuard)
	async certificatePreview(@Res() res: Response, @Session() session: UserSession) {
		const fileUrl = await this.studentCertificateService.getCertificatePreview(res, session.user.id);

		const response = await axios.get(fileUrl, {
			responseType: "stream",
		});

		res.set({
			"Content-Type": response.headers["content-type"],
		});

		response.data.pipe(res);
	}

	@Get("/")
	@UseGuards(UserParticipatedGuard)
	async certificateFull(@Res() res: Response, @Session() session: UserSession) {
		const fileUrl = await this.studentCertificateService.getCertificateFull(res, session.user.id);

		const response = await axios.get(fileUrl, {
			responseType: "stream",
		});

		res.set({
			"Content-Type": "application/pdf",
			"Content-Disposition": `inline; filename="certificate-${session.user.id}.pdf"`,
		});

		response.data.pipe(res);
	}
}
