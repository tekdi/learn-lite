import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoursemanagementService } from './coursemanagement.service';
import { CreateCoursemanagementDto } from './dto/create-coursemanagement.dto';
import { UpdateCoursemanagementDto } from './dto/update-coursemanagement.dto';
import { CreateCourseResponseDto } from './dto/create-course-response.dto';
import { v4 as uuidv4 } from 'uuid';
import { ResponseUtils } from './response-util';





@Controller('')
export class CoursemanagementController {
  constructor(private readonly coursemanagementService: CoursemanagementService) {}

  @Post('/course/v1/batch/create')
  async create(@Body() createCoursemanagementDto: CreateCoursemanagementDto) {
    
    return this.coursemanagementService.create(createCoursemanagementDto);

    
  }




}
