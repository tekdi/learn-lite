import { Module } from '@nestjs/common';
import { CoursemanagementService } from './coursemanagement.service';
import { CoursemanagementController } from './coursemanagement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Batchmanagement } from './entities/coursemanagement.entity';


@Module({
  imports : [TypeOrmModule.forFeature([Batchmanagement])],

  controllers: [CoursemanagementController],
  providers: [CoursemanagementService],
})
export class CoursemanagementModule {}
