import { Module } from "@nestjs/common";
import { StudentFileController } from "./student-file.controller";
import { StudentFileService } from "./student-file.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
	controllers: [StudentFileController],
	providers: [StudentFileService],
})
export class StudentFileModule {}
