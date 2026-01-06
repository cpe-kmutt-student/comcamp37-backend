import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { config } from "../config/app.config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

const pool = new PrismaPg({ connectionString: config.db.url });
const prisma = new PrismaClient({ adapter: pool });

export const auth = betterAuth({
	basePath: "/api/auth",
	trustedOrigins: ["http://localhost:3000", config.app.frontendUrl].filter(Boolean),
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	session: {
		strategy: "database",
		expiresIn: 60 * 60 * 24 * 7, // 7 days
	},
	socialProviders: {
		google: {
			clientId: config.auth.googleClientId,
			clientSecret: config.auth.googleClientSecret,
		},
	},
	hooks: {},
});
