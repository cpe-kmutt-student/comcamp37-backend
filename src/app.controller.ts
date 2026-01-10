import { Controller, Get } from "@nestjs/common";
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
}
