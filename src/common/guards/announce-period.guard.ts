import { Type } from "@aws-sdk/client-s3";
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, InternalServerErrorException } from "@nestjs/common";
import type { UserSession } from "@thallesp/nestjs-better-auth";
import { Session } from "@thallesp/nestjs-better-auth";
import { Observable } from "rxjs";
import { config } from "src/config/app.config";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
export class AnnounceAndConfirmPeriodGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		try {
			if (config.resultAnnounceAndConfirmPeriod.bypass) {
				return true;
			}

			if (!config.resultAnnounceAndConfirmPeriod.start || !config.resultAnnounceAndConfirmPeriod.end) {
				throw new Error();
			}

			const startTime = new Date(config.resultAnnounceAndConfirmPeriod.start).getTime(); // UTC
			const endTime = new Date(config.resultAnnounceAndConfirmPeriod.end).getTime(); // UTC
			const currentTime = Date.now(); // UTC

			if (currentTime < startTime || currentTime > endTime) {
				throw new Error();
			}

			return true;
		} catch (e) {
			throw new ForbiddenException("Apploication Result Announce and Confirmation is not allowed at this time. The registration period has ended or has not started yet.");
		}
	}
}
