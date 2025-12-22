import type { CorsOptions } from "cors";
import { config } from "./app.config";

export const corsConfig: CorsOptions = {
	origin: config.app.allowOrigins,
	credentials: true,
};
