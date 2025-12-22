import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import morgan from "morgan";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const corsOptions: CorsOptions = {
		origin: ["http://localhost:3000", "https://yourdomain.com"],
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	};

	app.enableCors(corsOptions);

	app.use(morgan("dev"));

	await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
