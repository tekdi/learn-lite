import { Controller, Post, Body } from '@nestjs/common';
import { CoursemanagementService } from './coursemanagement.service';
import { CreateBatchemanagementDto } from './dto/create-coursemanagement.dto';
import { ResponseUtils } from './response-util';





@Controller('')
export class CoursemanagementController {
  constructor(private readonly coursemanagementService: CoursemanagementService) {}

  @Post('/course/v1/batch/create')
  async createBatch(@Body() createCoursemanagementDto: CreateBatchemanagementDto) {
   const result=  await this.coursemanagementService.createBatch(createCoursemanagementDto);  
    const res = { response: 'SUCCESS', batchId: result.batchId };
    return ResponseUtils.SuccessResponse(res, 'api.course.batch.create');
    
  }
}
