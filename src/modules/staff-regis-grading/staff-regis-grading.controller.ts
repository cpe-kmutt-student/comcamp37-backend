import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { RegisGuard } from "src/common/guards/regis.guard";
import { StaffRegisGradingDto } from "./dto/staff-regis-grading.dto";
import { StaffRegisGradingService } from "./staff-regis-grading.service";

@Controller("/api/staff/regis/answer")
export class StaffRegisGradingController {
	constructor(private readonly staffRegisGradingService: StaffRegisGradingService) {}

	@Get("/")
	@UseGuards(RegisGuard)
	getAll() {
		return this.staffRegisGradingService.getAll();
	}

	@Get("/:id")
	@UseGuards(RegisGuard)
	getAnswerByAppId(@Param("id") appId: string) {
		return this.staffRegisGradingService.getAnswerByAppId(appId);
	}

	@Post("/grading")
	@UseGuards(RegisGuard)
	answerGrading(@Session() session: UserSession, @Body() staffRegisGradingDto: StaffRegisGradingDto) {
		return this.staffRegisGradingService.answerGrading(session.user.id, staffRegisGradingDto);
	}
}
