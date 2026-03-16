import { Module } from "@nestjs/common";
import { CalculateScoreService } from "./calculate-score.service";
import { StaffTotalScoreController } from "./staff-total-score.controller";
import { StaffTotalScoreService } from "./staff-total-score.service";

@Module({
	controllers: [StaffTotalScoreController],
	providers: [StaffTotalScoreService, CalculateScoreService],
	exports: [CalculateScoreService],
})
export class StaffTotalScoreModule {}
