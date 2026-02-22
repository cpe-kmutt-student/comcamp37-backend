import { Injectable } from "@nestjs/common";
import os from "os";
import { config } from "./config/app.config";
import { LoggerService } from "./core/logger/logger.service";

@Injectable()
export class AppService {
	constructor(private readonly logger: LoggerService) {}

	async getStatus() {
		return {
			title: "ComCamp 37 Backend REST API",
			credits: "Made with 🧡 & ☕️ by CPE 39",
			greeting: ["เอ๋~~ เดี๋ยวนะ! นี่น้องเข้ามาได้่ไงเนี่ยยย", "คงไปเจอบัคสิท่า 😅", "เเต่ไม่ต้องตกใจไปเดี๋ยวน้องกดลิ้งด้านล่างนี้ก็จะกลับไปหน้าลงทะเบียนได้เเล้ว", "เย่~~", config.app.frontendUrl],
			config: {
				cors_origin: config.app.allowOrigins,
				regis_period: config.regisPeriod,
			},
			status: "ok",
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

	timeLeft() {
		if (!config.regisPeriod.start || !config.regisPeriod.end) return "Register period have not set yet";
		const currentUTC = Date.now();
		const end = new Date(config.regisPeriod.end).getTime();
		const ms = end - currentUTC;
		return {
			current: new Date(currentUTC + 7 * 60 * 60 * 1000).toISOString().replace("Z", "+07:00"),
			start_at: config.regisPeriod.start,
			end_at: config.regisPeriod.end,
			time_left: {
				day: Math.floor(ms / (1000 * 60 * 60 * 24)),
				hour: Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
				minute: Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60)),
				second: Math.floor((ms % (1000 * 60)) / 1000),
				milisecond: ms % 1000,
			},
		};
	}
}
