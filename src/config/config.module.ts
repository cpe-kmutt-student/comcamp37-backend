import { Module } from "@nestjs/common";
import { ConfigModule as EnvModule } from "@nestjs/config";
import { ConfigService } from "./config.service";

@Module({
	imports: [EnvModule.forRoot()],
	providers: [ConfigService],
	exports: [ConfigService],
})
export class ConfigModule {}
