import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";
import { StudentUserController } from "./student-user.controller";
import { StudentUserService } from "./student-user.service";

@Module({
	controllers: [StudentUserController],
	providers: [StudentUserService],
})
export class StudentUserModule {}
