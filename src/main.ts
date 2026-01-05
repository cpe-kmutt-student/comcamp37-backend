import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import morgan from "morgan";
import { config } from "./config/app.config";
import { corsConfig } from "./config/cors.config";
import { ValidationPipe } from "@nestjs/common";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./libs/auth";
import type { NestExpressApplication } from "@nestjs/platform-express";
import type { Express, Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		bodyParser: false
	});

	app.enableCors(corsConfig as any);
	app.use(morgan("dev"));
	app.use(cookieParser());


	app.useGlobalPipes(new ValidationPipe());

	await app.listen(config.app.port);
}
bootstrap();
