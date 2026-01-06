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
import { JwtModule } from "@nestjs/jwt";
import { config } from "./config/app.config";
import { StudentInfoModule } from "./student-info/student-info.module";
import { TestAuthModule } from "./test-auth/test-auth.module";
import { AuthModule as BetterAuthModule } from "@thallesp/nestjs-better-auth";
import { auth } from "./lib/auth";
import { AuthModule } from "./auth/auth.module";

@Module({
	imports: [
		ConfigModule.forRoot(),
		BetterAuthModule.forRoot({ auth, disableTrustedOriginsCors: true, disableControllers: true }),
		AuthModule,
		PrismaModule,
		UploadModule,
		StudentUserModule,
		JwtModule.register({
			global: true,
			secret: config.auth.jwtSecret,
			signOptions: { expiresIn: "1d" },
		}),
		StudentInfoModule,
		TestAuthModule,
		AuthModule,
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
