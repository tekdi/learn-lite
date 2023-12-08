import { Injectable } from '@nestjs/common';
import { CreateBatchemanagementDto } from './dto/create-coursemanagement.dto';
import { Coursemanagement } from './entities/coursemanagement.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseUtils } from './response-util';

@Injectable()
export class CoursemanagementService {

  
  constructor(@InjectRepository(Coursemanagement) private readonly courseManagementRepository: Repository<Coursemanagement>) {}

  async createBatch(createCoursemanagementDto: CreateBatchemanagementDto):Promise<Coursemanagement> {
    const {
      courseId,
      name,
      description,
      enrollmentType,
      startDate,
      endDate,
      certTemplates,
      createdBy,
      createdFor,
      endDateText,
      enrollmentEndDate,
      enrollmentEndDateText,
      mentors,
      status,
      tandc,
  } = createCoursemanagementDto;

    ResponseUtils.validateField(courseId, 'INVALID_COURSE_ID', 'Course does not exist. Please provide a valid course identifier', 'INVALID_COURSE_ID');
    ResponseUtils.validateField(name, 'INVALID_NAME', 'Please provide valid name', 'INVALID_NAME');
    ResponseUtils.validateField(description, 'INVALID_DESCRIPTION', 'Please provide description', 'INVALID_DESCRIPTION');
    ResponseUtils.validateField(enrollmentType, 'INVALID_ENROLLMENT_TYPE', 'Please provide enrollment type', 'INVALID_ENROLLMENT_TYPE');
    ResponseUtils.validateField(startDate, 'INVALID_START_DATE', 'Please provide start date', 'INVALID_START_DATE');
    ResponseUtils.validateField(endDate, 'INVALID_END_DATE', 'Please provide end date', 'INVALID_END_DATE');

    const coursemanagement = this.courseManagementRepository.create({
      courseId,
      name,
      description,
      enrollmentType,
      startDate,
      endDate,
      certTemplates,
      createdBy,
      createdFor,
      endDateText,
      enrollmentEndDate,
      enrollmentEndDateText,
      mentors,
      status,
      tandc,
  });

  return   await this.courseManagementRepository.save(coursemanagement);
   }

 
}
