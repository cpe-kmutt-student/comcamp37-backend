import { Type } from "@aws-sdk/client-s3";
import { CanActivate, ExecutionContext, ForbiddenException, HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import type { UserSession } from "@thallesp/nestjs-better-auth";
import { Session } from "@thallesp/nestjs-better-auth";
import { Observable, retry } from "rxjs";
import { LoggerService } from "src/core/logger/logger.service";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
export class UserParticipatedGuard implements CanActivate {
	constructor(
		private readonly prisma: PrismaService,
		private readonly logger: LoggerService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const session = request.session as UserSession;

		try {
			const studentApplication = await this.prisma.studentApplication.findMany({
				where: {
					std_user: {
						id: session.user.id,
					},
					std_application_confirm: true,
				},
			});

			if (studentApplication.length === 0) {
				throw new ForbiddenException("Your application not pass or not confirm");
			}

			return true;
		} catch (e) {
			this.logger.error(e);
			if (e instanceof HttpException) {
				throw e;
			}

			throw new InternalServerErrorException(e);
		}
	}
}
