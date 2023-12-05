// courseenrollment.service.ts

import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnrollRequestDto } from './dto/enroll-request.dto';
import { Courseenrollment } from './entities/courseenrollment.entity';

@Injectable()
export class CourseenrollmentService {
  constructor(
    @InjectRepository(Courseenrollment)
    private readonly courseEnrollmentRepository: Repository<Courseenrollment>,
  ) {}

  private validCourses = ['course1', 'course2'];
  private validBatches = ['batchA', 'batchB'];
  private validUsers = ['user123', 'user456'];

  async enrollUser(enrollRequest: EnrollRequestDto): Promise<string> {
    const { courseId, batchId, userId } = enrollRequest;

    const isCourseValid = this.validCourses.includes(courseId);
    const isBatchValid = this.validBatches.includes(batchId);
    const isUserValid = this.validUsers.includes(userId);

    if (!courseId) {
      throw new BadRequestException('CourseId is Required');
    }
    if (!batchId) {
      throw new BadRequestException('batchId is Required');
    }
    if (!userId) {
      throw new BadRequestException('userId is Required');
    }


    if (isCourseValid && isBatchValid && isUserValid) {
      const existingEnrollment = await this.courseEnrollmentRepository.findOne({
        where: { courseId, batchId, userId },
      });

      if (existingEnrollment) {
        if (!existingEnrollment.active) {
          existingEnrollment.active = true;
          await this.courseEnrollmentRepository.save(existingEnrollment);
          return 'Enrollment updated successfully';
        } else {
          throw new ConflictException('User is already enrolled');
        }
      } else {
        const enrollmentEntity = this.courseEnrollmentRepository.create({
          userId,
          courseId,
          batchId,
          active: true,
        });

        await this.courseEnrollmentRepository.save(enrollmentEntity);

        return 'Enrollment successful';
      }
    } else {
      throw new NotFoundException('Invalid courseId, batchId, or userId');
    }
  }

  


}
