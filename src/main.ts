import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import morgan from "morgan";
import type { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import { config } from "./config/app.config";
import bodyParser from "body-parser";
import { corsConfig } from "./config/cors.config";
import cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";
import { auth } from "./lib/auth";
import { toNodeHandler } from "better-auth/node";
import type { IncomingMessage, ServerResponse } from "node:http";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		bodyParser: false,
	});

	app.enableCors(corsConfig);
	app.useGlobalPipes(new ValidationPipe());
	app.use(cookieParser());
	app.use(morgan("dev"));

	// const expressApp = app.getHttpAdapter().getInstance();
	// const authHandler = toNodeHandler(auth);
	// expressApp.all("/api/auth/*path", (req: IncomingMessage, res: ServerResponse) => {
	// 	return authHandler(req, res);
	// });

	await app.listen(config.app.port);
}
bootstrap();
