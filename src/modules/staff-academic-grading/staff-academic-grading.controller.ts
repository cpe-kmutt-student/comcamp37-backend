import { Controller, Get } from "@nestjs/common";
import { StaffAcademicGradingService } from "./staff-academic-grading.service";

@Controller("/api/staff/academic/answer")
export class StaffAcademicGradingController {
	constructor(private readonly staffAcademicGradingService: StaffAcademicGradingService) {}

	@Get("/")
	getAcademicAll() {
		return this.staffAcademicGradingService.getAcademicAll();
	}
}
