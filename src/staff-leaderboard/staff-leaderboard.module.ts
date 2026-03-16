import { Module } from "@nestjs/common";
import { StaffLeaderboardController } from "./staff-leaderboard.controller";
import { StaffLeaderboardService } from "./staff-leaderboard.service";

@Module({
	controllers: [StaffLeaderboardController],
	providers: [StaffLeaderboardService],
})
export class StaffLeaderboardModule {}
