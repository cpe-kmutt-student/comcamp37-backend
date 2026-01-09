import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { StatusUpdateModule } from "src/status-update/status-update.module";
import { StudentFileController } from "./student-file.controller";
import { StudentFileService } from "./student-file.service";

@Module({
	imports: [StatusUpdateModule],
	controllers: [StudentFileController],
	providers: [StudentFileService],
})
export class StudentFileModule {}
