import { Type } from "@aws-sdk/client-s3";
import { CanActivate, ExecutionContext, Injectable, InternalServerErrorException } from "@nestjs/common";
import type { UserSession } from "@thallesp/nestjs-better-auth";
import { Session } from "@thallesp/nestjs-better-auth";
import { Observable } from "rxjs";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
export class AcademicGuard implements CanActivate {
	constructor(private readonly prisma: PrismaService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const session = request.session as UserSession;

		try {
			const staffUser = await this.prisma.user.findUnique({
				where: {
					id: session.user.id,
				},
			});

			if (!staffUser) return false;

			if (staffUser.role === "admin") return true;

			if (staffUser.role !== "academic") return false;

			return true;
		} catch (e) {
			return false;
		}
	}
}
