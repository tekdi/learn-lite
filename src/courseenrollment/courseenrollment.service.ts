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

  async unenrollUser(unenrollRequest: EnrollRequestDto): Promise<string> {
    const { courseId, batchId, userId } = unenrollRequest;

    if (!courseId) {
      throw new BadRequestException('CourseId is Required');
    }
    if (!batchId) {
      throw new BadRequestException('batchId is Required');
    }
    if (!userId) {
      throw new BadRequestException('userId is Required');
    }

    const enrollmentEntity = await this.courseEnrollmentRepository.findOne({
      where: { courseId, batchId, userId },
    });

    if (!enrollmentEntity) {
      throw new NotFoundException('Enrollment record not found');
    }

    enrollmentEntity.active = false;

    await this.courseEnrollmentRepository.save(enrollmentEntity);

    const unenrollmentResult = 'Unenrollment successful';
    return unenrollmentResult;
  }

  // courseenrollment.service.ts

async getEnrolledCourses(userId: string): Promise<string[]> {
  try {
    const enrolledCourses = await this.courseEnrollmentRepository
      .createQueryBuilder('enrollment')
      .where('enrollment.userId = :userId', { userId })
      // .andWhere('enrollment.active = true')
      .select('enrollment.courseId', 'courseid')  // Use the default alias
      .distinct(true)
      .getRawMany();

    // console.log('Enrolled Courses:', enrolledCourses);

    if (enrolledCourses.length === 0) {
      throw new NotFoundException('User has not enrolled in any courses');
    }

    return enrolledCourses.map((course) => course.courseid);  // Use the default alias
  } catch (error) {
    console.error('Error in getEnrolledCourses:', error);
    throw error;
  }
}

}
