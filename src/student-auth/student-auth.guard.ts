import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { config } from "src/config/app.config";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class StudentAuthGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtService,
		private readonly prisma: PrismaService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>();
		const token = this.extractTokenFromCookie(request);
		if (!token) {
			throw new UnauthorizedException();
		}
		try {
			const payload = await this.jwtService.verifyAsync(token, {
				secret: config.auth.jwtSecret,
			});

			if (!payload || !payload.user_id) {
				throw new UnauthorizedException();
			}

			const studentUser = await this.prisma.studentUsers.findUnique({
				where: {
					std_user_id: payload.user_id,
				},
			});

			if (!studentUser) throw new UnauthorizedException();

			request.user = studentUser;
		} catch (e) {
			throw new UnauthorizedException();
		}
		return true;
	}

	private extractTokenFromCookie(req: Request): string | undefined {
		return req.cookies?.token;
	}
}
