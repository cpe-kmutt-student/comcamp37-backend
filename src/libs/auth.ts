import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../../generated/prisma/client";
import { config } from "../config/app.config";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new PrismaPg({ connectionString: config.db.url });
const prisma = new PrismaClient({ adapter: pool });

const isDev = process.env.NODE_ENV !== "production";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	baseURL: process.env.BETTER_AUTH_URL || `http://localhost:${config.app.port}`,
	secret: process.env.BETTER_AUTH_SECRET,
	trustedOrigins: config.app.allowOrigins,
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60, // 5 minutes
		},
	},
	advanced: {
		// Ensure cookies work in development (non-HTTPS)
		useSecureCookies: !isDev,
	},
	socialProviders: {
		google: {
			accessType: "offline",
			prompt: "select_account consent",
			clientId: config.auth.googleClientId as string,
			clientSecret: config.auth.googleClientSecret as string,
		},
	},
});
