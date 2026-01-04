import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

@Injectable()
export class StudentAuthMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		const token = req.cookies?.token;
		console.log(token);

		if (!token) {
			throw new UnauthorizedException("Missing access token");
		}
		next();
	}
}
