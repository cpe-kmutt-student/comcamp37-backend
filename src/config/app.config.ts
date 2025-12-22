export const config = {
	app: {
		port: process.env.APP_PORT || 3000,
		allowOrigins: (process.env.APP_ALLOW_ORIGIN || "").split(","),
	},
	db: {
		url: process.env.DATABASE_URL || "",
	},
};
