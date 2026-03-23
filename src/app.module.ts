import { join } from "node:path";
import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ServeStaticModule } from "@nestjs/serve-static";
import { AuthModule as BetterAuthModule } from "@thallesp/nestjs-better-auth";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { logger } from "./common/middlewares/Logger.middleware";
import { config } from "./config/app.config";
import { AuthModule } from "./core/auth/auth.module";
import { EmailModule } from "./core/email/email.module";
import { LoggerModule } from "./core/logger/logger.module";
import { LoggerService } from "./core/logger/logger.service";
import { PrismaModule } from "./core/prisma/prisma.module";
// import { UsersModule } from "./users/users.module";
import { PrismaService } from "./core/prisma/prisma.service";
import { ResendModule } from "./core/resend/resend.module";
import { S3Module } from "./core/s3/s3.module";
import { auth } from "./lib/auth";
import { ApplicationConfirmationModule } from "./modules/application-confirmation/application-confirmation.module";
import { ApplicationFileModule } from "./modules/application-file/application-file.module";
import { ApplicationInfoModule } from "./modules/application-info/application-info.module";
import { ApplicationPaymentEvidenceModule } from "./modules/application-payment-evidence/application-payment-evidence.module";
import { ApplicationQuestionModule } from "./modules/application-question/application-question.module";
import { ApplicationStatusModule } from "./modules/application-status/application-status.module";
import { ApplicationSubmitModule } from "./modules/application-submit/application-submit.module";
import { EmailNotificationModule } from "./modules/email-notification/email-notification.module";
import { StaffAcademicChaosGradingModule } from "./modules/staff-academic-chaos-grading/staff-academic-chaos-grading.module";
import { StaffAcademicChaosQuestionModule } from "./modules/staff-academic-chaos-question/staff-academic-chaos-question.module";
import { StaffAcademicGradingModule } from "./modules/staff-academic-grading/staff-academic-grading.module";
import { StaffAcademicQuestionModule } from "./modules/staff-academic-question/staff-academic-question.module";
import { StaffAccountModule } from "./modules/staff-account/staff-account.module";
import { StaffApplicationModule } from "./modules/staff-application/staff-application.module";
import { StaffEmailModule } from "./modules/staff-email/staff-email.module";
import { StaffExportModule } from "./modules/staff-export/staff-export.module";
import { StaffFileModule } from "./modules/staff-file/staff-file.module";
import { StaffLeaderboardModule } from "./modules/staff-leaderboard/staff-leaderboard.module";
import { StaffRegisGradingModule } from "./modules/staff-regis-grading/staff-regis-grading.module";
import { StaffRegisQuestionModule } from "./modules/staff-regis-question/staff-regis-question.module";
import { StaffStatisticModule } from "./modules/staff-statistic/staff-statistic.module";
import { StaffStatusModule } from "./modules/staff-status/staff-status.module";
import { StaffStatusUpdaterModule } from "./modules/staff-status-updater/staff-status-updater.module";
import { StaffTotalScoreModule } from "./modules/staff-total-score/staff-total-score.module";
import { StatusUpdaterModule } from "./modules/status-updater/status-updater.module";
import { StudentApplicationModule } from "./modules/student-application/student-application.module";
import { TicketModule } from "./modules/ticket/ticket.module";
import { UtilModule } from "./modules/util/util.module";

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
		UtilModule,
		StaffRegisGradingModule,
		StaffAcademicGradingModule,
		LoggerModule,
		StaffStatusUpdaterModule,
		StaffFileModule,
		StaffAcademicQuestionModule,
		StaffAcademicChaosQuestionModule,
		StaffAcademicChaosGradingModule,
		TicketModule,
		StaffEmailModule,
		StaffTotalScoreModule,
		StaffLeaderboardModule,
		ApplicationPaymentEvidenceModule,
		StaffExportModule,
	],

	controllers: [AppController],
	providers: [AppService, PrismaService, LoggerService],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(logger).exclude({ path: "/favicon.ico", method: RequestMethod.GET }, { path: "/", method: RequestMethod.GET }, { path: "/health", method: RequestMethod.GET }).forRoutes("*");
	}
}
