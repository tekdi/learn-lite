import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoursemanagementDto } from './dto/create-coursemanagement.dto';
import { UpdateCoursemanagementDto } from './dto/update-coursemanagement.dto';
import { Coursemanagement } from './entities/coursemanagement.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCourseResponseDto } from './dto/create-course-response.dto';
import { ResponseUtils } from './response-util';
import { getCourseBatchFilterDto } from './dto/cousebatch-filter.dto';

@Injectable()
export class CoursemanagementService {


  constructor(@InjectRepository(Coursemanagement) private readonly courseManagementRepository: Repository<Coursemanagement>) { }

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

    ResponseUtils.validateField(coursemanagement, 'INVALID_BATCH_ID', 'Batch does not exist. Please provide a valid batch identifier', 'INVALID_BATCH_ID')

    return coursemanagement;
  }

  async update(batchId: string, updateCoursemanagementDto: UpdateCoursemanagementDto) {
    const existingCoursemanagement = await this.findOne(batchId);

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
    } = updateCoursemanagementDto;

    ResponseUtils.validateField(startDate, 'INVALID_START_DATE', 'Please provide start date', 'INVALID_START_DATE');
    ResponseUtils.validateField(status, 'INVALID_STATUS', 'Please provide status', 'INVALID_STATUS');
    ResponseUtils.validateField(courseId, 'INVALID_COURSE_ID', 'Course does not exist. Please provide a valid course identifier', 'INVALID_COURSE_ID');

    if (name) {
      existingCoursemanagement.name = name;
    }

    if (description) {
      existingCoursemanagement.description = description;
    }

    if (enrollmentType) {
      existingCoursemanagement.enrollmentType = enrollmentType;
    }

    if (startDate) {
      existingCoursemanagement.startDate = startDate;
    }

    if (endDate) {
      existingCoursemanagement.endDate = endDate;
    }

    if (certTemplates) {
      existingCoursemanagement.certTemplates = certTemplates;
    }

    if (createdBy) {
      existingCoursemanagement.createdBy = createdBy;
    }

    if (createdFor) {
      existingCoursemanagement.createdFor = createdFor;
    }

    if (endDateText) {
      existingCoursemanagement.endDateText = endDateText;
    }

    if (enrollmentEndDate) {
      existingCoursemanagement.enrollmentEndDate = enrollmentEndDate;
    }

    if (enrollmentEndDateText) {
      existingCoursemanagement.enrollmentEndDateText = enrollmentEndDateText;
    }

    if (mentors) {
      existingCoursemanagement.mentors = mentors;
    }

    if (status) {
      existingCoursemanagement.status = status;
    }

    if (tandc) {
      existingCoursemanagement.tandc = tandc;
    }

    return await this.courseManagementRepository.save(existingCoursemanagement);

  }

  async getFilteredCourses(filterDto: getCourseBatchFilterDto) {
    const { limit, query } = filterDto;
    const courseId = filterDto.filters.courseId;
    const coursemanagement = await this.courseManagementRepository.findOne({ where: { courseId } });
    ResponseUtils.validateField(coursemanagement, 'INVALID_COURSE_ID', 'Course does not exist. Please provide a valid course identifier', 'INVALID_COURSE_ID')

    if (!courseId || courseId.trim() === '') {
      throw new BadRequestException('CourseId is required and should not be empty.');
    }


    let queryBuilder = this.courseManagementRepository.createQueryBuilder('coursemanagement');

    if (courseId) {
      queryBuilder = queryBuilder.where('coursemanagement.courseId = :courseId', { courseId });
    }

    if (query) {
      queryBuilder = queryBuilder.andWhere('(coursemanagement.name ILIKE :query OR coursemanagement.description ILIKE :query)', { query: `%${query}%` });
    }

    
    const count = await queryBuilder.getCount();
    const content = await queryBuilder.limit(limit).getMany();

    return { response:{count, content:content} };
  }



}
