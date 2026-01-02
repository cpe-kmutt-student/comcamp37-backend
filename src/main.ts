import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import morgan from "morgan";
import type { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import { config } from "./config/app.config";
import bodyParser from "body-parser";
import { corsConfig } from "./config/cors.config";
import cookieParser from "cookie-parser";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors(corsConfig);

	app.use(cookieParser());
	app.use(
		bodyParser.urlencoded({
			extended: false,
			limit: "10mb",
		}),
	);
	app.use(morgan("dev"));

	await app.listen(config.app.port);
}
bootstrap();
