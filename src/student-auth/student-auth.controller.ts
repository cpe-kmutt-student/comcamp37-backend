import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { GoogleAuthGuard } from "./student-auth.guard";
import type { Request, Response } from "express";

@Controller("student/auth")
export class StudentAuthController {
	@Get("/")
    @UseGuards(GoogleAuthGuard)
	async redirectGoogleAuth(@Req() _req: Request, @Res() res: Response) {}

    @Get('/callback')
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
        return res.json(req.user)
    }
}
