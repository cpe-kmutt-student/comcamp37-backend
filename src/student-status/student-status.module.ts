import { Module } from "@nestjs/common";
import { StudentStatusController } from "./student-status.controller";
import { StudentStatusService } from "./student-status.service";

@Module({
	controllers: [StudentStatusController],
	providers: [StudentStatusService],
})
export class StudentStatusModule {}
