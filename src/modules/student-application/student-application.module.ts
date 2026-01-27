import { Module } from "@nestjs/common";
import { StudentApplicationController } from "./student-application.controller";
import { StudentApplicationService } from "./student-application.service";

@Module({
	controllers: [StudentApplicationController],
	providers: [StudentApplicationService],
})
export class StudentApplicationModule {}
