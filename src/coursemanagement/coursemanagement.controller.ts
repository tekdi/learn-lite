import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe } from '@nestjs/common';
import { CoursemanagementService } from './coursemanagement.service';
import { CreateCoursemanagementDto } from './dto/create-coursemanagement.dto';
import { UpdateCoursemanagementDto } from './dto/update-coursemanagement.dto';
import { CreateCourseResponseDto } from './dto/create-course-response.dto';
import { v4 as uuidv4 } from 'uuid';
import { ResponseUtils } from './response-util';
import { getCourseBatchFilterDto } from './dto/cousebatch-filter.dto';





@Controller('')
export class CoursemanagementController {
  constructor(private readonly coursemanagementService: CoursemanagementService) {}

  @Post('/course/v1/batch/create')
  async create(@Body() createCoursemanagementDto: CreateCoursemanagementDto) {
    
    return this.coursemanagementService.create(createCoursemanagementDto);

    
  }

  @Get('/course/v1/batch/read/:batchId')
  async findOne(@Param('batchId') batchId: string) {
    const response = await this.coursemanagementService.findOne(batchId);
    return ResponseUtils.SuccessResponse({response},"api.course.batch.read");

  }

  @Patch('/course/v1/batch/update/:batchId')
  async update(@Param('batchId') batchId: string, @Body() updateCoursemanagementDto: UpdateCoursemanagementDto) {
    const result= await this.coursemanagementService.update(batchId, updateCoursemanagementDto);
    
    return ResponseUtils.SuccessResponse({},"api.course.batch.update");
  }

  

  @Post('/course/v1/batch/list')
  async filterCourses(@Body(new ValidationPipe()) filterDto: getCourseBatchFilterDto) {
    const filteredCourses = await this.coursemanagementService.getFilteredCourses(filterDto);
    const count = filteredCourses.response.count;

    return ResponseUtils.SuccessResponse({...filteredCourses,count},"api.course.batch.update");
  }



}
