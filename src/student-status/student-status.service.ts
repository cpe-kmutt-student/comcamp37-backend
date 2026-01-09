import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { StudentStatusDto } from "./dto/student-status.dto";

@Injectable()
export class StudentStatusService {
	constructor(private readonly prisma: PrismaService) {}

	getAllStatus(userId: string) {}

	getStatusByStatus(userId: string, studentStatusDto: StudentStatusDto) {}
}
