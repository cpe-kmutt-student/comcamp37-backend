import type { IncomingMessage, ServerResponse } from "node:http";
import { ValidationPipe } from "@nestjs/common";
import type { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { toNodeHandler } from "better-auth/node";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { AppModule } from "./app.module";
import { config } from "./config/app.config";
import { corsConfig } from "./config/cors.config";
import { auth } from "./lib/auth";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		bodyParser: false,
	});

	app.enableCors(corsConfig);
	app.useGlobalPipes(new ValidationPipe());
	app.use(cookieParser());
	app.use(morgan("dev"));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	const swaggerConfig = new DocumentBuilder().setTitle("ComCamp37 API Document").setDescription("ComCamp37 backend API for a student registration/camp system").setVersion("Dev 0.1.0").build();
	const swaggerDocumentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup("docs", app, swaggerDocumentFactory);

	await app.listen(config.app.port);
}
bootstrap();
