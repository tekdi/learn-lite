import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { CourseenrollmentService } from './courseenrollment.service';
import { EnrollResponseDto } from './dto/enroll-response.dto';
import { EnrollRequestDto } from './dto/enroll-request.dto';
import { v4 as uuidv4 } from 'uuid';


@Controller()
export class CourseenrollmentController {
  constructor(private readonly courseenrollmentService: CourseenrollmentService) {}

  @Post('/course/v1/enrol')
  async enrollUser(@Body() enrollRequest: EnrollRequestDto): Promise<EnrollResponseDto> {
    try {
      const result = await this.courseenrollmentService.enrollCourse(enrollRequest);
      return this.createSuccessResponse(result);
    } catch (error) {
      return this.createErrorResponse(error.message);
    }
  }

  private createSuccessResponse(response: string): EnrollResponseDto {
    const msgid = this.generateMsgId();
    return {
      id: 'api.course.enroll',
      ver: 'v1',
      ts: new Date().toISOString(),
      params: {
        resmsgid: null,
        msgid,
        err: null,
        status: 'success',
        errmsg: null,
      },
      responseCode: 'OK',
      result: { response },
    };
  }

  private createErrorResponse(errorMsg: string): EnrollResponseDto {
    const msgid = this.generateMsgId();
    return {
      id: 'api.course.enroll',
      ver: 'v1',
      ts: new Date().toISOString(),
      params: {
        resmsgid: null,
        msgid,
        err: 'API_ERROR',
        status: 'failed',
        errmsg: errorMsg,
      },
      responseCode: 'CLIENT_ERROR',
      result: {},
    };
  }
  private generateMsgId(): string {
    return uuidv4();
  }

  @Post('/course/v1/unenrol')
  async unenrollUser(@Body() unenrollRequest: EnrollRequestDto): Promise<EnrollResponseDto> {
    try {
      const result = await this.courseenrollmentService.unenrollCourse(unenrollRequest);
      return this.createSuccessResponse(result);
    } catch (error) {
      return this.createErrorResponse(error.message);
    }
  }

  @Get('/course/v1/user/enrollment/list/:userId')
  async getEnrolledCourses(@Param('userId') userId: string): Promise<string[]> {
    try {
      const enrolledCourses = await this.courseenrollmentService.getEnrolledCourses(userId);
      return enrolledCourses;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('User not found or has not enrolled in any courses');
      }
      throw error;
    }
  }
}
