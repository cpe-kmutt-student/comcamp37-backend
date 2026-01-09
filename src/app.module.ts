import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule as BetterAuthModule } from "@thallesp/nestjs-better-auth";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { config } from "./config/app.config";
import { auth } from "./lib/auth";
import { PrismaModule } from "./prisma/prisma.module";
// import { UsersModule } from "./users/users.module";
import { PrismaService } from "./prisma/prisma.service";
import { StudentFileModule } from "./student-file/student-file.module";
import { StudentInfoModule } from "./student-info/student-info.module";
import { StudentStatusModule } from "./student-status/student-status.module";
import { StudentUserModule } from "./student-user/student-user.module";

@Module({
	imports: [
		ConfigModule.forRoot(),
		BetterAuthModule.forRoot({ auth, disableTrustedOriginsCors: true, disableControllers: true }),
		AuthModule,
		PrismaModule,
		StudentUserModule,
		JwtModule.register({
			global: true,
			secret: config.auth.jwtSecret,
			signOptions: { expiresIn: "1d" },
		}),
		StudentInfoModule,
		AuthModule,
		StudentFileModule,
		StudentStatusModule,
	],

	controllers: [AppController],
	providers: [AppService, PrismaService],
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
