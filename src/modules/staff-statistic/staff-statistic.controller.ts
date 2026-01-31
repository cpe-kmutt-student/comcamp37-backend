import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AllowAnonymous, Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { StaffGuard } from "src/common/guards/staff.guard";
import { StaffStatisticCountResponseDto } from "./dto/staff-statistic-response.dto";
import { StaffStatisticService } from "./staff-statistic.service";

@ApiTags("Staff Statistic")
@Controller("/api/staff/statistic")
export class StaffStatisticController {
	constructor(private readonly staffStatisticService: StaffStatisticService) {}

	@Get("/")
	@UseGuards(StaffGuard)
	@ApiOperation({
		description: "Retrieve application statistics including user counts, submission status, and gender breakdown (Staff only)",
	})
	@ApiResponse({
		status: 200,
		description: "Successfully retrieved statistics",
		type: StaffStatisticCountResponseDto,
	})
	@ApiResponse({
		status: 403,
		description: "Forbidden - Staff access required",
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	getCountAll() {
		return this.staffStatisticService.getCountAll();
	}
}
