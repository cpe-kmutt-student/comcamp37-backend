import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { RegisGuard } from "src/common/guards/regis.guard";
import { StaffApplicationService } from "./staff-application.service";

@Controller("/api/staff/application")
export class StaffApplicationController {
	constructor(private readonly staffApplicationService: StaffApplicationService) {}

	@Get("/all")
	@UseGuards(RegisGuard)
	getAll() {
		return this.staffApplicationService.getAll();
	}

	@Get("/:id")
	@UseGuards(RegisGuard)
	getByAppId(@Param("id") appId: string) {
		return this.staffApplicationService.getByAppId(appId);
	}
}
