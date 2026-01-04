import { Injectable } from "@nestjs/common";
import { PrismaClient } from "generated/prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class StudentGoogleService {
	constructor(private readonly prisma: PrismaService) {}

	createStudentUser() {}

	getStudentUser() {}
}
