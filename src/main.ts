import fs from "node:fs";
import type { IncomingMessage, ServerResponse } from "node:http";
import path from "node:path";
import { ValidationPipe } from "@nestjs/common";
import type { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { apiReference } from "@scalar/nestjs-api-reference";
import { toNodeHandler } from "better-auth/node";
import bodyParser from "body-parser";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { AppModule } from "./app.module";
import { config } from "./config/app.config";
import { corsConfig } from "./config/cors.config";
import { LoggerService } from "./core/logger/logger.service";
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
	app.getHttpAdapter().getInstance().set("trust proxy", 1);

	const swaggerConfig = new DocumentBuilder().setTitle("ComCamp37 API Document").setDescription("ComCamp37 backend API for a student registration/camp system").setVersion("Dev 0.1.0").build();
	const swaggerDocumentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup("docs", app, swaggerDocumentFactory);

	const OpenApiSpecification = app.use(
		"/reference",
		apiReference({
			theme: "default",
			content: swaggerDocumentFactory(),
		}),
	);
	const logger = new LoggerService();
	await app
		.listen(config.app.port)
		.then(() => {
			helloComCamp();
			logger.start("Service Port :", config.app.port);
			logger.info("Cors Origin :", config.app.allowOrigins.join(" "));
			logger.info("Frontend URL :", config.app.frontendUrl);
			logger.info("BetterAuth URL :", process.env.BETTER_AUTH_URL);
			logger.info("S3 Endpoint :", config.s3.endpoint);
			logger.info("S3 Bucket :", config.s3.bucket);
			logger.info("Email User :", config.email.nodemailer.user);
			logger.info("Register Period Set to :", config.regisPeriod.start, "-", config.regisPeriod.end);
			logger.info("Is Register Bypass :", config.regisPeriod.bypass);
		})
		.catch((e) => {
			logger.error(e);
		});
}

function helloComCamp() {
	if (fs.existsSync(path.join(process.cwd(), "comcamp37.txt"))) {
		try {
			const logFileData = fs.readFileSync(path.join(process.cwd(), "comcamp37.txt"), "utf8");
			function colorize(text: string) {
				return text
					.replace(/@/g, chalk.white("@"))
					.replace(/#/g, chalk.yellow("#"))
					.replace(/\+/g, chalk.hex("#ff7a45")("+"))
					.replace(/\*/g, chalk.yellow("*"))
					.replace(/%/g, chalk.hex("#ff9c66")("%"))
					.replace(/=/g, chalk.gray("="))
					.replace(/-/g, chalk.gray("-"));
			}

			console.log(colorize(logFileData));
		} catch (e) {}
	}
}
bootstrap();
