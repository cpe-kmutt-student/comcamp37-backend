import { Module } from "@nestjs/common";
import { StaffStudentUserController } from "./staff-student-user.controller";
import { StaffStudentUserService } from "./staff-student-user.service";

@Module({
	controllers: [StaffStudentUserController],
	providers: [StaffStudentUserService],
})
export class StaffStudentUserModule {}
