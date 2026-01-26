import { join } from "node:path";
import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ServeStaticModule } from "@nestjs/serve-static";
import { AuthModule as BetterAuthModule } from "@thallesp/nestjs-better-auth";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ApplicationInfoModule } from "./application-info/application-info.module";
import { ApplicationStatusModule } from "./application-status/application-status.module";
import { AuthModule } from "./auth/auth.module";
import { config } from "./config/app.config";
import { ConfigModule } from "./config/config.module";
import { EmailModule } from "./email/email.module";
import { auth } from "./lib/auth";
import { PrismaModule } from "./prisma/prisma.module";
// import { UsersModule } from "./users/users.module";
import { PrismaService } from "./prisma/prisma.service";
import { S3Module } from "./s3/s3.module";
import { SendMailModule } from "./send-mail/send-mail.module";
import { StaffStudentQuestionModule } from "./staff-student-question/staff-student-question.module";
import { StaffStudentUserModule } from "./staff-student-user/staff-student-user.module";
import { StatusUpdateModule } from "./status-update/status-update.module";
import { StudentApplicationModule } from "./student-application/student-application.module";
import { StudentFileModule } from "./student-file/student-file.module";
import { StudentInfoModule } from "./student-info/student-info.module";
import { StudentQuestionModule } from "./student-question/student-question.module";
import { StudentStatusModule } from "./student-status/student-status.module";
import { StudentUserModule } from "./student-user/student-user.module";

@Module({
	imports: [
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
		StatusUpdateModule,
		S3Module,
		ServeStaticModule.forRoot({
			rootPath: join(process.cwd(), "public"),
			exclude: ["/api/{*path}", "/docs/{*path}", "/{*path}"],
		}),
		StudentQuestionModule,
		StaffStudentUserModule,
		StaffStudentQuestionModule,
		SendMailModule,
		EmailModule,
		ConfigModule,
		StudentApplicationModule,
		ApplicationStatusModule,
		ApplicationInfoModule,
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
