import { Controller, Get, UseGuards } from "@nestjs/common";
import { AllowAnonymous, Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { StaffGuard } from "src/common/guards/staff.guard";
import { StaffStatisticService } from "./staff-statistic.service";

@Controller("/api/staff/statistic")
export class StaffStatisticController {
	constructor(private readonly staffStatisticService: StaffStatisticService) {}

	@Get("/count")
	// @UseGuards(StaffGuard)
	@AllowAnonymous()
	getCountAll() {
		return this.staffStatisticService.getCountAll();
	}
}
