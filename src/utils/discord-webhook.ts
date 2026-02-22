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
}
