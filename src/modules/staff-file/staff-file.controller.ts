import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { RegisGuard } from "src/common/guards/regis.guard";
import { StaffGuard } from "src/common/guards/staff.guard";
import { PrismaService } from "src/core/prisma/prisma.service";
import { StaffFileService } from "./staff-file.service";

@Controller("/api/staff/file")
export class StaffFileController {
	constructor(private readonly staffFileService: StaffFileService) {}

	@Get("/:id")
	@UseGuards(StaffGuard)
	getFileById(@Param("id") fileId: string) {
		return this.staffFileService.getFileById(fileId);
	}

	@Get("/user/:id")
	@UseGuards(RegisGuard)
	getFileByUserId(@Param("id") userId: string) {
		return this.staffFileService.getFileByUserId(userId);
	}

	@Get("/application/:id")
	@UseGuards(RegisGuard)
	getFilesByApplicationId(@Param("id") appId: string) {
		return this.staffFileService.getFilesByApplicationId(appId);
	}
}
