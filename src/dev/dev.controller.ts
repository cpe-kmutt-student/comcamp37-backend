import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import type { Request, Response } from "express";
import { SetCookieDto } from "./dto/set-cookie.dto";
import { JwtService } from "@nestjs/jwt";

@Controller("dev")
export class DevController {
	constructor(private readonly jwtService: JwtService) {}

	@Post("/setcookie")
	async setCookie(@Body() setCookieDto: SetCookieDto, @Res() res: Response) {
		res.cookie("token", setCookieDto.token, {
			path: "/",
			expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
			httpOnly: true,
		});
		return res.json({
			status: "SUCCESS",
		});
	}
}
