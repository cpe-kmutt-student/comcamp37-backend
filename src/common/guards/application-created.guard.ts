import { Type } from "@aws-sdk/client-s3";
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, InternalServerErrorException } from "@nestjs/common";
import type { UserSession } from "@thallesp/nestjs-better-auth";
import { Session } from "@thallesp/nestjs-better-auth";
import { Observable, retry } from "rxjs";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
export class ApplicationCreatedGuard implements CanActivate {
	constructor(private readonly prisma: PrismaService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const session = request.session as UserSession;

		try {
			const studentApplication = await this.prisma.studentApplication.findMany({
				where: {
					std_user: {
						id: session.user.id,
					},
				},
			});

			if (studentApplication.length > 0) {
				throw "Cannot create application more than one";
			}

			return true;
		} catch (e) {
			throw new ForbiddenException(e);
		}
	}
}
