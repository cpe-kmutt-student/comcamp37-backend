import { Module } from '@nestjs/common';
import { StudentInfoController } from './student-info.controller';
import { StudentInfoService } from './student-info.service';

@Module({
  controllers: [StudentInfoController],
  providers: [StudentInfoService]
})
export class StudentInfoModule {}
