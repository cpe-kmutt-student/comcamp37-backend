import { Module } from "@nestjs/common";
import { StudentUserController } from "./student-user.controller";
import { StudentUserService } from "./student-user.service";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
	controllers: [StudentUserController],
	providers: [StudentUserService],
})
export class StudentUserModule {}
