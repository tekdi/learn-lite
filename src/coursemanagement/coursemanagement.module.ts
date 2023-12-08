import { Module } from '@nestjs/common';
import { CourseBatchService } from './coursemanagement.service';
import { CourseBatchController } from './coursemanagement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Batchmanagement } from './entities/coursemanagement.entity';


@Module({
  imports : [TypeOrmModule.forFeature([Batchmanagement])],

  controllers: [CourseBatchController],
  providers: [CourseBatchService],
})
export class CoursemanagementModule {}
