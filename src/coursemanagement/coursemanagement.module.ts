import { Module } from '@nestjs/common';
import { CoursemanagementService } from './coursemanagement.service';
import { CoursemanagementController } from './coursemanagement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coursemanagement } from './entities/coursemanagement.entity';


@Module({
  imports : [TypeOrmModule.forFeature([Coursemanagement])],

  controllers: [CoursemanagementController],
  providers: [CoursemanagementService],
})
export class CoursemanagementModule {}
