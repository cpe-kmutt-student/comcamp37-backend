import { Injectable, InternalServerErrorException, NotAcceptableException } from "@nestjs/common";
import { UserRoles } from "generated/prisma/enums";
import { PrismaService } from "src/core/prisma/prisma.service";
import { auth } from "src/lib/auth";
import { CreateStaffAccountDto, DeleteStaffAccountDto, UpdateStaffAccountDto } from "./dto/staff-account.dto";

@Injectable()
export class StaffAccountService {
	constructor(private readonly prisma: PrismaService) {}

	async getAllAccount() {
		try {
			const staffAccount = await this.prisma.user.findMany({
				where: {
					OR: [
						...Object.values(UserRoles)
							.filter((r) => r !== "user")
							.map((r) => ({ role: r })),
					], // convert enum to array => filter except user => map to object { role: {ROLENAME} }
				},
			});

			return staffAccount;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	async getAllRoles() {
		return [
			...Object.values(UserRoles)
				.filter((r) => r !== "user")
				.map((r) => ({ role: r })),
		];
	}

	async createStaffAccount(createStaffAccountDto: CreateStaffAccountDto) {
		try {
			const createdUser = await auth.api.signUpEmail({
				body: {
					email: createStaffAccountDto.email,
					name: createStaffAccountDto.name,
					password: createStaffAccountDto.password,
					username: createStaffAccountDto.username,
					displayUsername: createStaffAccountDto.name,
				},
			});

			const staffAccount = await this.prisma.user.update({
				where: {
					id: createdUser.user.id,
				},
				data: {
					role: createStaffAccountDto.role,
				},
			});

			return staffAccount;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	async updateStaffAccount(updateStaffAccountDto: UpdateStaffAccountDto) {
		try {
			if (updateStaffAccountDto.password) {
				await auth.api.setUserPassword({
					body: {
						userId: updateStaffAccountDto.id,
						newPassword: updateStaffAccountDto.password,
					},
				});
			}

			if (updateStaffAccountDto.role) {
				await this.prisma.user.update({
					where: {
						id: updateStaffAccountDto.id,
					},
					data: {
						role: updateStaffAccountDto.role,
					},
				});
			}

			const staffUser = await this.prisma.user.findUnique({
				where: {
					id: updateStaffAccountDto.id,
					role: updateStaffAccountDto.role,
				},
			});

			return staffUser;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}

	async deleteStaffAccount(deleteStaffAccountDto: DeleteStaffAccountDto) {
		try {
			if (!deleteStaffAccountDto.is_confirm) {
				return new NotAcceptableException();
			}

			const deletedUser = await auth.api.removeUser({
				body: {
					userId: deleteStaffAccountDto.id,
				},
			});

			return deletedUser;
		} catch (e) {
			throw new InternalServerErrorException();
		}
	}
}
