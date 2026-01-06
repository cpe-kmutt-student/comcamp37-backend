import { Controller, Req, Res, All, Get } from "@nestjs/common";
import { auth } from "../lib/auth";
import type { Request, Response } from "express";
import { AllowAnonymous } from "@thallesp/nestjs-better-auth";
import { authClient } from "src/lib/auth-client";

@Controller("api/auth")
export class TestAuthController {
  
   @Get("/ping")
//    @AllowAnonymous()
    async ping() {
        await authClient.signIn.social({
            /**
             * The social provider ID
             * @example "github", "google", "apple"
             */
            provider: "github",
            /**
             * A URL to redirect after the user authenticates with the provider
             * @default "/"
             */
            callbackURL: "/dashboard", 
            /**
             * A URL to redirect if an error occurs during the sign in process
             */
            errorCallbackURL: "/error",
            /**
             * A URL to redirect if the user is newly registered
             */
            newUserCallbackURL: "/welcome",
            /**
             * disable the automatic redirect to the provider. 
             * @default false
             */
            disableRedirect: true,
        });
    }


}