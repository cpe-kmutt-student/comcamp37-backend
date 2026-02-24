import { Injectable } from "@nestjs/common";
import { SignaleLogger } from "src/lib/signale-logger";
import { DiscordWebhook } from "src/utils/discord-webhook";

@Injectable()
export class LoggerService {
	private logger: SignaleLogger;
	private discordWebhook: DiscordWebhook;

	constructor() {
		this.logger = new SignaleLogger();
		this.discordWebhook = new DiscordWebhook();
	}

	info(...ctx: any[]) {
		this.logger.info(ctx.join(" "));
	}

	error(...ctx: any[]) {
		this.logger.error(ctx.join(" "));
		this.discordWebhook.send(this.discordWebhook.errorEmbed(ctx.join(" ")));
	}

	start(...ctx: any[]) {
		this.logger.start(ctx.join(" "));
		this.discordWebhook.send(this.discordWebhook.startEmbed(ctx.join(" ")));
	}
}
