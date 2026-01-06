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
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		bodyParser: false,
	});

	app.enableCors(corsConfig);
	app.useGlobalPipes(new ValidationPipe());
	app.use(cookieParser());
	app.use(morgan("dev"));

	const swaggerConfig = new DocumentBuilder().setTitle("ComCamp37 API Document").setDescription("ComCamp37 backend API for a student registration/camp system").setVersion("Dev 0.1.0").build();
	const swaggerDocumentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup("docs", app, swaggerDocumentFactory);

	// const expressApp = app.getHttpAdapter().getInstance();
	// const authHandler = toNodeHandler(auth);
	// expressApp.all("/api/auth/*path", (req: IncomingMessage, res: ServerResponse) => {
	// 	return authHandler(req, res);
	// });

	await app.listen(config.app.port);
}
bootstrap();
