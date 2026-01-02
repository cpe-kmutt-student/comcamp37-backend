import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
	constructor(private jwtService: JwtService) {}

	async signIn(
		userId: string,
		email: string,
	): Promise<{ access_token: string }> {
		const payload = { sub: userId, email };
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}

	async verifyToken(token: string): Promise<object> {
		try {
			return await this.jwtService.verifyAsync(token);
		} catch {
			throw new UnauthorizedException("Invalid token");
		}
	}
}
