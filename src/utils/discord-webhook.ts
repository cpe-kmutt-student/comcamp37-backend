import axios from "axios";
import { config } from "src/config/app.config";
import { SignaleLogger } from "src/lib/signale-logger";

interface EmbedMessage {
	title: string;
	description: string;
	color: number;
	footer: {
		text: string;
	};
}

export class DiscordWebhook {
	logger: SignaleLogger;

	constructor() {
		this.logger = new SignaleLogger();
	}

	async send(body: EmbedMessage) {
		try {
			if (!config.logging.webhookUrl) {
				this.logger.warn("Log webhook URL not set!");
				return;
			}

			await axios.post(config.logging.webhookUrl, {
				embeds: [body],
				allowed_mentions: {
					parse: ["everyone"],
				},
			});

			this.logger.success("Logging message has been sent!");
		} catch (e) {
			this.logger.error(e);
		}
	}

	errorEmbed(...ctx: any[]): EmbedMessage {
		return {
			title: "Service Error!!!",
			description: `\`\`\` ${ctx} \`\`\``,
			color: 16711680,
			footer: {
				text: "Backend Service | ComCamp 37",
			},
		};
	}

	startEmbed(...ctx: any[]) {
		return {
			title: "Service Started",
			description: `\`\`\` ${ctx.join(" ")} \`\`\``,
			color: 65280,
			footer: {
				text: "Backend Service | ComCamp 37",
			},
		};
	}

	requestEmbed(data: {
		method: string;
		url: string;
		ip: string;
		userAgent: string;
		body?: any;
		query?: any;
		headers?: Record<string, string | string[] | undefined>;
		userSession?: any;
		statusCode: number;
		responseTime: number;
		responseBody?: any;
	}): EmbedMessage {
		const statusColor = data.statusCode >= 400 ? 16711680 : data.statusCode >= 300 ? 16776960 : 65280;
		const bodyStr = data.body && Object.keys(data.body).length > 0 ? JSON.stringify(data.body, null, 2).slice(0, 500) : "No body";
		const queryStr = data.query && Object.keys(data.query).length > 0 ? JSON.stringify(data.query, null, 2).slice(0, 300) : "No query";
		const responseStr = data.responseBody ? JSON.stringify(data.responseBody, null, 2).slice(0, 800) : "No response body";

		// Filter sensitive headers
		const safeHeaders = data.headers
			? Object.fromEntries(
					Object.entries(data.headers)
						.filter(([key]) => !["authorization", "cookie", "set-cookie"].includes(key.toLowerCase()))
						.slice(0, 10),
				)
			: {};
		const headersStr = Object.keys(safeHeaders).length > 0 ? JSON.stringify(safeHeaders, null, 2).slice(0, 400) : "No headers";

		// User session as JSON
		const sessionStr = data.userSession ? JSON.stringify(data.userSession, null, 2).slice(0, 800) : "Not authenticated";

		return {
			title: `${data.method} ${data.url}`,
			description: [
				`**Status:** ${data.statusCode}`,
				`**Response Time:** ${data.responseTime}ms`,
				`**IP:** ${data.ip}`,
				`**User-Agent:** ${data.userAgent?.slice(0, 100) || "Unknown"}`,
				`**User Session:** \`\`\`json\n${sessionStr}\`\`\``,
				`**Headers:** \`\`\`json\n${headersStr}\`\`\``,
				`**Query:** \`\`\`json\n${queryStr}\`\`\``,
				`**Request Body:** \`\`\`json\n${bodyStr}\`\`\``,
				`**Response Body:** \`\`\`json\n${responseStr}\`\`\``,
			].join("\n"),
			color: statusColor,
			footer: {
				text: "Backend Service | ComCamp 37",
			},
		};
	}
}
