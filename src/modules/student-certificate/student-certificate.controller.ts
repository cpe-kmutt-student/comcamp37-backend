import { Controller, Get, Res, UseGuards } from "@nestjs/common";
import { AllowAnonymous } from "@thallesp/nestjs-better-auth";
import { type Response } from "express";
import { UserParticipatedGuard } from "src/common/guards/user-particicated.guard";
import { StudentCertificateService } from "./student-certificate.service";

@Controller("/api/student/certificate")
export class StudentCertificateController {
	constructor(private readonly studentCertificateService: StudentCertificateService) {}

	@Get("/preview")
	// @UseGuards(UserParticipatedGuard)
	@AllowAnonymous()
	async certificatePreview(@Res() res: Response) {
		const imageBuffer = await this.studentCertificateService.generateImage("asdasda");

		res.set({
			"Content-Type": "image/png",
			"Content-Disposition": `attachment; filename=${"asdas"}.png`,
		});

		res.send(imageBuffer);
	}

	@Get("/download")
	@UseGuards(UserParticipatedGuard)
	certificateDownload() {
		return this.studentCertificateService;
	}
}
