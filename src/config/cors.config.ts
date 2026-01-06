import type { CorsOptions } from "cors";
import { config } from "./app.config";

export const corsConfig: CorsOptions = {
	origin: [...config.app.allowOrigins, config.app.frontendUrl].filter(Boolean),
	credentials: true,
};
