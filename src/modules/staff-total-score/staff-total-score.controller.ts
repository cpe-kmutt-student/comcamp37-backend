import { Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { AdminGuard } from "src/common/guards/admin.guard";
import { RegisGuard } from "src/common/guards/regis.guard";
import { StaffTotalScoreService } from "./staff-total-score.service";

@Controller("/api/staff/total-score")
export class StaffTotalScoreController {
	constructor(private readonly staffTotalScoreService: StaffTotalScoreService) {}

	@Post("/calculate/run")
	@HttpCode(HttpStatus.ACCEPTED)
	@UseGuards(AdminGuard)
	calculateRunAll() {
		return this.staffTotalScoreService.calculateRun();
	}

	@Post("/calculate/run/:appid")
	@HttpCode(HttpStatus.ACCEPTED)
	@UseGuards(AdminGuard)
	calculateRun(@Param("appid") appId: string) {
		return this.staffTotalScoreService.calculateRun(appId);
	}

	@Get("/")
	@UseGuards(RegisGuard)
	getAppTotalScoreAll() {
		return this.staffTotalScoreService.getAppTotalScore();
	}

	@Get("/:appid")
	@UseGuards(RegisGuard)
	getAppTotalScore(@Param("appid") appId: string) {
		return this.staffTotalScoreService.getAppTotalScore(appId);
	}
}
