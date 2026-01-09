import { Module } from "@nestjs/common";
import { StatusUpdateModule } from "src/status-update/status-update.module";
import { StudentInfoController } from "./student-info.controller";
import { StudentInfoService } from "./student-info.service";

@Module({
	imports: [StatusUpdateModule],
	controllers: [StudentInfoController],
	providers: [StudentInfoService],
})
export class StudentInfoModule {}
