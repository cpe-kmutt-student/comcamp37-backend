import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { PrismaClient } from "generated/prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

interface RequestUserProfile extends Express.User {
	profile: {
		id: string;
		emails: {
			value: string;
			verified: boolean;
		}[];
		name: {
			familyName: string;
			givenName: string;
		};
		displayName: string;
	};
	accessToken: string;
}

@Injectable()
export class StudentGoogleService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService,
	) {}

	async createStudentUserNew(req: Request): Promise<void> {
		const userProfile = (req.user as RequestUserProfile).profile;
		console.log(req.user);

		try {
			const studentUser = await this.prisma.studentUsers.findUnique({
				where: {
					std_user_id: userProfile.id,
					std_user_email: userProfile.emails[0].value,
				},
			});

			if (studentUser) return; // return if user is available or registered

			const a = await this.prisma.studentUsers.create({
				data: {
					std_user_id: userProfile.id,
					std_user_email: userProfile.emails[0].value,
				},
			});
		} catch (e) {
			return;
		}
	}

	async createStudentUserToken(req: Request): Promise<string> {
		const userProfile = (req.user as RequestUserProfile).profile;
		const userAccessToken = (req.user as RequestUserProfile).accessToken;

		try {
			const studentUser = await this.prisma.studentUsers.findUnique({
				where: {
					std_user_id: userProfile.id,
					std_user_email: userProfile.emails[0].value,
				},
			});

			if (!studentUser) return "";

			const userJwtToken = this.jwtService.sign({
				user_access_token: userAccessToken,
				user_id: userProfile.id,
				user_email: userProfile.emails[0].value,
			});

			return userJwtToken;
		} catch (e) {
			return "";
		}
	}
}
