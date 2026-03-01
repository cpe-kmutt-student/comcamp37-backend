import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { RegisGuard } from "src/common/guards/regis.guard";
import { StaffGuard } from "src/common/guards/staff.guard";
import { PrismaService } from "src/core/prisma/prisma.service";

@Controller("/api/staff/file")
export class StaffFileController {
	constructor(private readonly prisma: PrismaService) {}

	@Get("/:id")
	@UseGuards(RegisGuard)
	getFileById(@Param("id") fileId: string) {}

	@Get("/application/:id")
	@UseGuards(RegisGuard)
	getFilesByApplicationId(@Param("id") appId: string) {}
}
