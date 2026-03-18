import { Controller, Get, Param, ParseEnumPipe, UseGuards } from "@nestjs/common";
import { AppInfoGender } from "generated/prisma/enums";
import { AnnounceAndConfirmPeriodGuard } from "src/common/guards/announce-period.guard";
import { RegisGuard } from "src/common/guards/regis.guard";
import { StaffLeaderboardService } from "./staff-leaderboard.service";

export enum EducationLevel {
	M4 = "m4",
	M5 = "m5",
}

@Controller("/api/staff/leaderboard")
export class StaffLeaderboardController {
	constructor(private readonly staffLeaderboardService: StaffLeaderboardService) {}

	@Get("/pass/:gender/:level")
	@UseGuards(RegisGuard)
	getPassApplication(@Param("gender", new ParseEnumPipe(AppInfoGender)) gender: AppInfoGender, @Param("level", new ParseEnumPipe(EducationLevel)) level: EducationLevel) {
		console.log(level);
		return this.staffLeaderboardService.getPassApplication(gender, level);
	}

	@Get("/reserve/:gender/:level")
	@UseGuards(RegisGuard)
	getReserveApplication(@Param("gender", new ParseEnumPipe(AppInfoGender)) gender: AppInfoGender, @Param("level", new ParseEnumPipe(EducationLevel)) level: EducationLevel) {
		return this.staffLeaderboardService.getReserveApplication(gender, level);
	}
}
