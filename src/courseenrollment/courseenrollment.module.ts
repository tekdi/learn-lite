import { Module } from '@nestjs/common';
import { CourseenrollmentService } from './courseenrollment.service';
import { CourseenrollmentController } from './courseenrollment.controller';
import { Courseenrollment } from './entities/courseenrollment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Courseenrollment])],
  controllers: [CourseenrollmentController],
  providers: [CourseenrollmentService],
})
export class CourseenrollmentModule {}
