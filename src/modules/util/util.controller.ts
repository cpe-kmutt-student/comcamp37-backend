import { Controller, Get, Param, Query } from "@nestjs/common";
import { AllowAnonymous } from "@thallesp/nestjs-better-auth";
import { UtilService } from "./util.service";

@Controller("/api/util")
export class UtilController {
	constructor(private readonly utilService: UtilService) {}

	@Get("/schools")
	@AllowAnonymous()
	getSchools(@Query("q") query?: string) {
		return this.utilService.getSchools(query);
	}

	@Get("/address")
	@AllowAnonymous()
	getAddress(@Query("postal") postal?: string) {
		return this.utilService.getAddressByPostal(postal);
	}
}
