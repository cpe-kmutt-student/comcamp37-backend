import { Controller, Get, Res, UseGuards } from "@nestjs/common";
import { AllowAnonymous } from "@thallesp/nestjs-better-auth";
import { type Response } from "express";
import { RegisGuard } from "src/common/guards/regis.guard";
import { StaffGuard } from "src/common/guards/staff.guard";
import { PrismaService } from "src/core/prisma/prisma.service";
import { StaffExportService } from "./staff-export.service";

@Controller("/api/staff/export")
export class StaffExportController {
	constructor(private readonly staffExportService: StaffExportService) {}

	@Get("/")
	@UseGuards(StaffGuard)
	exportAll(@Res() res: Response) {
		return this.staffExportService.exportAll(res);
	}
}
