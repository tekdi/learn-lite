import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoursemanagementDto } from './dto/create-coursemanagement.dto';
import { UpdateCoursemanagementDto } from './dto/update-coursemanagement.dto';
import { Coursemanagement } from './entities/coursemanagement.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCourseResponseDto } from './dto/create-course-response.dto';
import { ResponseUtils } from './response-util';

@Injectable()
export class CoursemanagementService {

  
  constructor(@InjectRepository(Coursemanagement) private readonly courseManagementRepository: Repository<Coursemanagement>) {}

  async create(createCoursemanagementDto: CreateCoursemanagementDto) {
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

  const result = await this.courseManagementRepository.save(coursemanagement);

    const res = { response: 'SUCCESS', batchId: result.batchId };
    return ResponseUtils.SuccessResponse(res, 'api.course.batch.create');

  
  
    }

    async findOne(batchId: string) {
 
    
      const coursemanagement = await this.courseManagementRepository.findOne({ where: { batchId } });
  
      ResponseUtils.validateField(coursemanagement,'INVALID_BATCH_ID', 'Batch does not exist. Please provide a valid batch identifier', 'INVALID_BATCH_ID' )
  
      return coursemanagement;
    }   

 
}
