import { Body, Controller, Get, Param, Post, Session, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import type { UserSession } from "@thallesp/nestjs-better-auth";
import { StudentFileDto } from "./dto/student-file.dto";
import { StudentFileService } from "./student-file.service";

@Controller("student/file")
export class StudentFileController {
	constructor(private readonly studentFileService: StudentFileService) {}

	@Post("/upload")
	@UseInterceptors(FileInterceptor("file"))
	async fileUpload(@Session() session: UserSession, @Body() studentFileDto: StudentFileDto, @UploadedFile() file: Express.Multer.File) {
		return await this.studentFileService.uploadFile(session.user.id, studentFileDto, file);
	}

	@Get("/")
	async fileAll(@Session() session: UserSession) {
		return await this.studentFileService.getAllFiles(session.user.id);
	}

	@Get("/:type")
	async getByType(@Session() session: UserSession, @Param() studentFileDto: StudentFileDto) {
		return await this.studentFileService.getByType(session.user.id, studentFileDto.type);
	}
}
