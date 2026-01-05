import { Controller, Get, Req, Res } from '@nestjs/common';
import { AllowAnonymous, OptionalAuth, Session, AuthService } from '@thallesp/nestjs-better-auth';
import type { UserSession } from "@thallesp/nestjs-better-auth";
import type { Request, Response } from 'express';
import { auth } from '../libs/auth';
import { config } from '../config/app.config';

@Controller('test-auth')
export class TestAuthController {

    constructor(private readonly authService: AuthService<typeof auth>) {}

    @Get("login/google")
    @AllowAnonymous()
    async loginGoogle(@Res() res: Response) {
        // Use better-auth's API to get the OAuth URL
        const result = await this.authService.api.signInSocial({
            body: {
                provider: "google",
                callbackURL: "http://localhost:3030/test-auth/me",
            },
        });
        
        // signInSocial returns an object with { url, redirect } for social providers
        if (result && 'url' in result && result.url) {
            return res.redirect(result.url);
        }
        
        return res.status(500).json({ error: 'Failed to initiate OAuth flow' });
    }

    @Get('me')
    async getProfile(@Session() session: UserSession) {
        return { user: session.user };
    }

    @Get('public')
    @AllowAnonymous()
    async getPublic() {
        return { message: 'Public route' };
    }

    @Get('optional')
    @OptionalAuth()
    async getOptional(@Session() session: UserSession) {
        return { authenticated: !!session, user: session?.user };
    }
}
