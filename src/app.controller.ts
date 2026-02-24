import { Controller, Get, UseGuards } from "@nestjs/common";
import { AllowAnonymous } from "@thallesp/nestjs-better-auth";
import { AppService } from "./app.service";

@Controller("/")
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get("/")
	@AllowAnonymous()
	getStatus() {
		return this.appService.getStatus();
	}

	@Get("/health")
	@AllowAnonymous()
	health() {
		return "ok";
	}

	@Get("/who")
	@AllowAnonymous()
	who() {
		return process.pid;
	}

	@Get("/timeleft")
	@AllowAnonymous()
	timeLeft() {
		return this.appService.timeLeft();
	}
}
