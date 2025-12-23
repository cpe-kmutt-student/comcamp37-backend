import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { PrismaService } from "./prisma/prisma.service";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { UploadService } from "./upload/upload.service";
import { UploadModule } from "./upload/upload.module";

@Module({
	imports: [UsersModule, ConfigModule.forRoot(), PrismaModule, UploadModule],
	controllers: [AppController],
	providers: [AppService, PrismaService, UploadService],
})
export class AppModule {}
