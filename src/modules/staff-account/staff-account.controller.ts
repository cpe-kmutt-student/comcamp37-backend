import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AllowAnonymous } from "@thallesp/nestjs-better-auth";
import { AdminGuard } from "src/common/guards/admin.guard";
import { CreateStaffAccountDto, DeleteStaffAccountDto, UpdateStaffAccountDto } from "./dto/staff-account.dto";
import { StaffAccountDeleteResponseDto, StaffAccountResponseDto, StaffRoleResponseDto } from "./dto/staff-account-response.dto";
import { StaffAccountService } from "./staff-account.service";

@ApiTags("Staff Account")
@Controller("/api/staff/account")
export class StaffAccountController {
	constructor(private readonly staffAccountService: StaffAccountService) {}

	@Get("/")
	@UseGuards(AdminGuard)
	@ApiOperation({
		description: "Retrieve all staff accounts (Admin only)",
	})
	@ApiResponse({
		status: 200,
		description: "Successfully retrieved all staff accounts",
		type: [StaffAccountResponseDto],
	})
	@ApiResponse({
		status: 403,
		description: "Forbidden - Admin access required",
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	getAllAccount() {
		return this.staffAccountService.getAllAccount();
	}

	@Post("/create")
	@UseGuards(AdminGuard)
	@ApiOperation({
		description: "Create a new staff account (Admin only)",
	})
	@ApiBody({
		type: CreateStaffAccountDto,
		description: "Staff account creation data",
	})
	@ApiResponse({
		status: 201,
		description: "Successfully created staff account",
		type: StaffAccountResponseDto,
	})
	@ApiResponse({
		status: 403,
		description: "Forbidden - Admin access required",
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	createStaffAccount(@Body() createStaffAccountDto: CreateStaffAccountDto) {
		return this.staffAccountService.createStaffAccount(createStaffAccountDto);
	}

	@Get("/roles")
	@UseGuards(AdminGuard)
	@ApiOperation({
		description: "Retrieve all available staff roles (Admin only)",
	})
	@ApiResponse({
		status: 200,
		description: "Successfully retrieved all roles",
		type: [StaffRoleResponseDto],
	})
	@ApiResponse({
		status: 403,
		description: "Forbidden - Admin access required",
	})
	getRoles() {
		return this.staffAccountService.getAllRoles();
	}

	@Post("/update")
	@UseGuards(AdminGuard)
	@ApiOperation({
		description: "Update a staff account (Admin only)",
	})
	@ApiBody({
		type: UpdateStaffAccountDto,
		description: "Staff account update data",
	})
	@ApiResponse({
		status: 200,
		description: "Successfully updated staff account",
		type: StaffAccountResponseDto,
	})
	@ApiResponse({
		status: 403,
		description: "Forbidden - Admin access required",
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	updateStaffAccount(@Body() updateStaffAccountDto: UpdateStaffAccountDto) {
		return this.staffAccountService.updateStaffAccount(updateStaffAccountDto);
	}

	@Post("/delete")
	@UseGuards(AdminGuard)
	@ApiOperation({
		description: "Delete a staff account (Admin only)",
	})
	@ApiBody({
		type: DeleteStaffAccountDto,
		description: "Staff account deletion data",
	})
	@ApiResponse({
		status: 200,
		description: "Successfully deleted staff account",
		type: StaffAccountDeleteResponseDto,
	})
	@ApiResponse({
		status: 403,
		description: "Forbidden - Admin access required",
	})
	@ApiResponse({
		status: 406,
		description: "Not Acceptable - Confirmation required",
	})
	@ApiResponse({
		status: 500,
		description: "Internal server error",
	})
	deleteStaffAccount(@Body() deleteStaffAccount: DeleteStaffAccountDto) {
		return this.staffAccountService.deleteStaffAccount(deleteStaffAccount);
	}
}
