import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { ApplicationInfoService } from "./application-info.service";
import { ApplicationInfoDto } from "./dto/application-info.dto";

@Controller("/api/application/info")
export class ApplicationInfoController {
	constructor(private readonly applicationInfoService: ApplicationInfoService) {}

	@Get("/:id")
	getInfo(@Session() session: UserSession, @Param("id") appId: string) {
		return this.applicationInfoService.getApplicationInfo(session.user.id, appId);
	}

	@Post("/:id")
	updateInfoHistory(@Session() session: UserSession, @Param("id") appId: string, @Body() applicationInfoDto: ApplicationInfoDto) {
		return this.applicationInfoService.updateApplicationInfo(session.user.id, appId, applicationInfoDto);
	}
}
