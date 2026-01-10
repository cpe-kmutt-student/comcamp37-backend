import { PrismaPg } from "@prisma/adapter-pg";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, username } from "better-auth/plugins";
import { PrismaClient } from "../../generated/prisma/client";
import { config } from "../config/app.config";

const pool = new PrismaPg({ connectionString: config.db.url });
const prisma = new PrismaClient({ adapter: pool });

export const auth = betterAuth({
	basePath: "/auth",
	trustedOrigins: config.app.allowOrigins,
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	session: {
		strategy: "database",
		expiresIn: 60 * 60 * 24 * 7, // 7 days
	},
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		google: {
			clientId: config.auth.googleClientId,
			clientSecret: config.auth.googleClientSecret,
		},
	},
	hooks: {},
	plugins: [admin(), username()],
});
