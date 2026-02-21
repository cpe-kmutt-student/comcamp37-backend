import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
export class StaffAcademicGradingService {
	constructor(private readonly prisma: PrismaService) {}

	async getAcademicAll() {
		return 0;
	}
}
