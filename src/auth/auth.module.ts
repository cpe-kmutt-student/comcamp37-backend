import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { config } from "src/config/app.config";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AuthGuard } from "./auth.guard";

@Module({
	imports: [
		JwtModule.register({
			global: true,
			secret: config.auth.jwtSecret,
			signOptions: { expiresIn: "1d" },
		}),
	],
	providers: [AuthService, AuthGuard],
	controllers: [AuthController],
	exports: [AuthService, AuthGuard],
})
export class AuthModule {}
