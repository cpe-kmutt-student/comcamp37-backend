import { NextFunction, Request, Response } from "express";
import { DiscordWebhook } from "src/utils/discord-webhook";

const discordWebhook = new DiscordWebhook();

export function logger(req: Request, res: Response, next: NextFunction) {
	const startTime = Date.now();
	let responseBody: any = null;

	// Capture original methods
	const originalJson = res.json.bind(res);
	const originalSend = res.send.bind(res);
	const originalEnd = res.end;

	// Override json to capture response body
	res.json = (body: any) => {
		responseBody = body;
		return originalJson(body);
	};

	// Override send to capture response body
	res.send = (body: any) => {
		if (typeof body === "string") {
			try {
				responseBody = JSON.parse(body);
			} catch {
				responseBody = body;
			}
		} else {
			responseBody = body;
		}
		return originalSend(body);
	};

	// Override end to send log
	res.end = function (chunk?: any, encoding?: any, callback?: any) {
		const responseTime = Date.now() - startTime;

		// Get user session (attached by better-auth middleware)
		const userSession = (req as any).session || null;

		// Send to Discord webhook
		discordWebhook.send(
			discordWebhook.requestEmbed({
				method: req.method,
				url: req.originalUrl || req.url,
				ip: req.ip || req.headers["x-forwarded-for"]?.toString() || "Unknown",
				userAgent: req.headers["user-agent"] || "Unknown",
				body: req.body,
				query: req.query,
				headers: req.headers,
				userSession,
				statusCode: res.statusCode,
				responseTime,
				responseBody,
			}),
		);

		// Call original end
		return originalEnd.call(this, chunk, encoding, callback);
	} as typeof res.end;

	next();
}
