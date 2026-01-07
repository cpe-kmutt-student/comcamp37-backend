import { Controller, Get, Post, Session, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import type { UserSession } from "@thallesp/nestjs-better-auth";
import { StudentFileService } from "./student-file.service";

@Controller("student/file")
export class StudentFileController {
	constructor(private readonly studentFileService: StudentFileService) {}

	@Post("/upload")
	@UseInterceptors(FileInterceptor("file"))
	fileUpload(@Session() session: UserSession, @UploadedFile() file: Express.Multer.File) {
		return this.studentFileService.uploadFile(session.user.id, file);
	}

	@Get("/")
	fileAll(@Session() session: UserSession) {
		return this.studentFileService.getAllFiles(session.user.id);
	}
}
