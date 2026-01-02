import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
// import { UsersModule } from "./users/users.module";
import { PrismaService } from "./prisma/prisma.service";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { UploadService } from "./upload/upload.service";
import { UploadModule } from "./upload/upload.module";
import { StudentUserModule } from "./student-user/student-user.module";
import { AuthModule } from "./auth/auth.module";
import { StudentAuthModule } from "./student-auth/student-auth.module";
import { StudentAuthMiddleware } from "./middleware/student-auth.middleware";

@Module({
	imports: [
		ConfigModule.forRoot(),
		PrismaModule,
		UploadModule,
		StudentUserModule,
		AuthModule,
		StudentAuthModule,
	],
	controllers: [AppController],
	providers: [AppService, PrismaService, UploadService],
})
export class AppModule {
	// configure(consumer: MiddlewareConsumer) {
	// 	consumer
	// 		.apply(StudentAuthMiddleware)
	// 		.exclude(
	// 			{ path: "/student/user/auth", method: RequestMethod.GET },
	// 			{ path: "/student/user/auth/callback", method: RequestMethod.GET },
	// 		)
	// 		.forRoutes("*");
	// }
}
