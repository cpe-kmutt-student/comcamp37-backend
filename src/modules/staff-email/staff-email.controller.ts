import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { RegisGuard } from "src/common/guards/regis.guard";
import { StaffSendEmailDto } from "./dto/staff-email.dto";
import { StaffEmailService } from "./staff-email.service";

@Controller("/api/staff/email")
export class StaffEmailController {
	constructor(private readonly staffEmailService: StaffEmailService) {}

	@Post("/send")
	@UseGuards(RegisGuard)
	staffSendEmail(@Session() session: UserSession, @Body() staffSendEmailDto: StaffSendEmailDto) {
		return this.staffEmailService.staffSendEmail(session.user.id, session.user.name, staffSendEmailDto);
	}

	@Get("/all")
	@UseGuards(RegisGuard)
	staffGetAllEmail() {
		return this.staffEmailService.staffGetAllEmail();
	}

	@Get("/user")
	@UseGuards(RegisGuard)
	staffGetAllEmailUser(@Query("q") query?: string) {
		return this.staffEmailService.staffGetAllEmailUser(query);
	}
}
