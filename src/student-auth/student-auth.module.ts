import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { config } from "src/config/app.config";
import { StudentAuthGuard } from "./student-auth.guard";

@Module({
	imports: [
		JwtModule.register({
			global: true,
			secret: config.auth.jwtSecret,
			signOptions: { expiresIn: "1d" },
		}),
	],
	providers: [StudentAuthGuard],
	controllers: [],
	exports: [StudentAuthGuard],
})
export class StudentAuthModule {}
