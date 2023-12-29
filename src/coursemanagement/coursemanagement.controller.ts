import { Controller, Post, Body,Get,Patch,Param,Delete } from '@nestjs/common';
import { CourseBatchService } from './coursemanagement.service';
import { CreateBatchemanagementDto } from './dto/create-coursemanagement.dto';
import { ResponseUtils } from './response-util';





@Controller('')
export class CourseBatchController {
  constructor(private readonly courseBatchService: CourseBatchService) {}

  @Post('/course/v1/batch/create')
  async createBatch(@Body() createBatchmanagementDto: CreateBatchemanagementDto) {
   const result=  await this.courseBatchService.createBatch(createBatchmanagementDto);  
    const res = { response: 'SUCCESS', batchId: result.batchId };
    return ResponseUtils.SuccessResponse(res, 'api.course.batch.create');
    
  }

  @Get('/course/v1/batch/read/:batchId')
  async getBatch(@Param('batchId') batchId: string) {
    const response = await this.courseBatchService.getBatch(batchId);
    return ResponseUtils.SuccessResponse({response},"api.course.batch.read");

  }

}
