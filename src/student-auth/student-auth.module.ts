import { Module } from "@nestjs/common";
import { StudentAuthController } from "./student-auth.controller";
import { StudentAuthService } from "./student-auth.service";
import { GoogleStrategy } from "./strategies/google.strategy";

@Module({
	controllers: [StudentAuthController],
	providers: [StudentAuthService, StudentAuthService, GoogleStrategy]
})
export class StudentAuthModule {}
