import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCourseResponseDto } from './dto/create-course-response.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ResponseUtils {


  static validateField(value: any, fieldName: String, errorCode: String, errorMessage: String) {
    if (!value) {
      throw new HttpException(
        {
          id: 'api.course.batch.create',
          ver: 'v1',
          ts: new Date().toISOString(),
          params: {
            resmsgid: null,
            msgid: 'e85a4592-7458-4506-a3e3-0dc00d923616',
            err: errorCode,
            status: errorCode,
            errmsg: errorMessage,
          },
          responseCode: 'CLIENT_ERROR',
          result: {},
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  static SuccessResponse(response: object, id: string): CreateCourseResponseDto {
    const msgid = this.generateMsgId();
    return {
      id: id,
      ver: 'v1',
      ts: new Date().toISOString(),
      params: {
        resmsgid: null,
        msgid: this.generateMsgId(),
        err: null,
        status: 'success',
        errmsg: null,
      },
      responseCode: 'OK',
      result: response,
    };
    
  }

  private static generateMsgId(): string {
    return uuidv4();
  }
}


