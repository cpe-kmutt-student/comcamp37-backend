import { join } from "node:path";
import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ServeStaticModule } from "@nestjs/serve-static";
import { AuthModule as BetterAuthModule } from "@thallesp/nestjs-better-auth";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { config } from "./config/app.config";
import { AuthModule } from "./core/auth/auth.module";
import { EmailModule } from "./core/email/email.module";
import { PrismaModule } from "./core/prisma/prisma.module";
// import { UsersModule } from "./users/users.module";
import { PrismaService } from "./core/prisma/prisma.service";
import { ResendModule } from "./core/resend/resend.module";
import { S3Module } from "./core/s3/s3.module";
import { auth } from "./lib/auth";
import { ApplicationConfirmationModule } from "./modules/application-confirmation/application-confirmation.module";
import { ApplicationFileModule } from "./modules/application-file/application-file.module";
import { ApplicationInfoModule } from "./modules/application-info/application-info.module";
import { ApplicationQuestionModule } from "./modules/application-question/application-question.module";
import { ApplicationStatusModule } from "./modules/application-status/application-status.module";
import { ApplicationSubmitModule } from "./modules/application-submit/application-submit.module";
import { EmailNotificationModule } from "./modules/email-notification/email-notification.module";
import { StaffAccountModule } from "./modules/staff-account/staff-account.module";
import { StaffApplicationModule } from "./modules/staff-application/staff-application.module";
import { StaffRegisQuestionModule } from "./modules/staff-regis-question/staff-regis-question.module";
import { StaffStatisticModule } from "./modules/staff-statistic/staff-statistic.module";
import { StaffStatusModule } from "./modules/staff-status/staff-status.module";
import { StatusUpdaterModule } from "./modules/status-updater/status-updater.module";
import { StudentApplicationModule } from "./modules/student-application/student-application.module";

@Module({
	imports: [
		BetterAuthModule.forRoot({ auth, disableTrustedOriginsCors: true, disableControllers: true }),
		AuthModule,
		PrismaModule,
		JwtModule.register({
			global: true,
			secret: config.auth.jwtSecret,
			signOptions: { expiresIn: "1d" },
		}),
		AuthModule,
		S3Module,
		ServeStaticModule.forRoot({
			rootPath: join(process.cwd(), "public"),
			exclude: ["/api/{*path}", "/docs/{*path}", "/{*path}"],
		}),
		EmailModule,
		StudentApplicationModule,
		ApplicationStatusModule,
		ApplicationInfoModule,
		ApplicationFileModule,
		ApplicationQuestionModule,
		ApplicationConfirmationModule,
		EmailNotificationModule,
		ResendModule,
		StatusUpdaterModule,
		StaffStatisticModule,
		StaffApplicationModule,
		StaffStatusModule,
		StaffAccountModule,
		StaffRegisQuestionModule,
		ApplicationSubmitModule,
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
