import type { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import { config } from "./app.config";

export const corsConfig: CorsOptions = {
	origin: config.app.allowOrigins,
	credentials: true,
};
