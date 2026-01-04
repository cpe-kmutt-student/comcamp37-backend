import { Module } from "@nestjs/common";
import { StudentGoogleController } from "./student-google.controller";
import { StudentGoogleService } from "./student-google.service";
import { StudentGoogleStrategy } from "./strategies/student-google.strategy";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
	controllers: [StudentGoogleController],
	providers: [StudentGoogleService, StudentGoogleStrategy, PrismaService],
})
export class StudentGoogleModule {}
