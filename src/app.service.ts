import { Injectable } from "@nestjs/common";
import os from "os";
import { config } from "./config/app.config";
import { LoggerService } from "./core/logger/logger.service";

@Injectable()
export class AppService {
	constructor(private readonly logger: LoggerService) {}

	async getStatus() {
		return {
			title: "ComCamp#37 Backend REST API",
			credits: "Made with 🧡 by ComCamp#37 Technic Team",
			greeting: [
				"😎 Whoa there, explorer!",
				"Congrats 🎉 you've discovered the Backend API URL.",
				"But wait… why are you here? 🤔",
				"This place is full of JSON, bugs, and sleepless nights — not for humans.",
				"Looking for the frontend? Totally understandable.",
				"Don't worry, I got you 🫶",
				"Click the magic portal below and I'll send you back safely 👇✨",
				config.app.frontendUrl,
			],
			config: {
				cors_origin: config.app.allowOrigins,
			},
			// ...(await this.getSystemSpecs()),
		};
	}

	async getSystemSpecs() {
		return {
			platform: os.platform(),
			arch: os.arch(),
			cpu: {
				model: os.cpus()[0].model,
				cores: os.cpus().length,
				speedMHz: os.cpus()[0].speed,
				avg: this.cpuAverage(),
				load: await this.getCpuUsagePercent(),
			},
			memory: {
				totalGB: (os.totalmem() / 1024 ** 3).toFixed(2),
				freeGB: (os.freemem() / 1024 ** 3).toFixed(2),
				usedGB: ((os.totalmem() - os.freemem()) / 1024 ** 3).toFixed(2),
			},
			uptimeSeconds: os.uptime(),
		};
	}
	cpuAverage() {
		const cpus = os.cpus();

		let idle = 0;
		let total = 0;

		cpus.forEach((cpu) => {
			for (const type in cpu.times) {
				total += cpu.times[type];
			}
			idle += cpu.times.idle;
		});

		return { idle, total };
	}
	async getCpuUsagePercent() {
		const start = this.cpuAverage();
		await new Promise((r) => setTimeout(r, 1000)); // 1 second
		const end = this.cpuAverage();

		const idleDiff = end.idle - start.idle;
		const totalDiff = end.total - start.total;

		const usage = 100 - Math.round((idleDiff / totalDiff) * 100);

		return usage;
	}
}
