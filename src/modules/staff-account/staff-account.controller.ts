import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { AllowAnonymous } from "@thallesp/nestjs-better-auth";
import { AdminGuard } from "src/common/guards/admin.guard";
import { CreateStaffAccountDto, DeleteStaffAccountDto, UpdateStaffAccountDto } from "./dto/staff-account.dto";
import { StaffAccountService } from "./staff-account.service";

@Controller("/api/staff/account")
export class StaffAccountController {
	constructor(private readonly staffAccountService: StaffAccountService) {}

	@Get("/")
	@UseGuards(AdminGuard)
	getAllAccount() {
		return this.staffAccountService.getAllAccount();
	}

	@Post("/create")
	@UseGuards(AdminGuard)
	createStaffAccount(@Body() createStaffAccountDto: CreateStaffAccountDto) {
		return this.staffAccountService.createStaffAccount(createStaffAccountDto);
	}

	@Get("/roles")
	@UseGuards(AdminGuard)
	getRoles() {
		return this.staffAccountService.getAllRoles();
	}

	@Post("/update")
	@UseGuards(AdminGuard)
	updateStaffAccount(@Body() updateStaffAccountDto: UpdateStaffAccountDto) {
		return this.staffAccountService.updateStaffAccount(updateStaffAccountDto);
	}

	@Post("/delete")
	@UseGuards(AdminGuard)
	deleteStaffAccount(@Body() deleteStaffAccount: DeleteStaffAccountDto) {
		return this.staffAccountService.deleteStaffAccount(deleteStaffAccount);
	}
}
