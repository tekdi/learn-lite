import { Transform } from 'class-transformer';
import { IsString, IsDate, IsBoolean, IsArray, IsInt,IsEnum } from 'class-validator';
import { EnrollmentType, Status } from '../entities/coursemanagement.entity';
import { v4 as uuidv4 } from 'uuid';

export class CreateCoursemanagementDto {

    courseId: string;
    name: string;
    description: string;
    @IsEnum(EnrollmentType,{message:'Invalid enrollment type'})
    enrollmentType: EnrollmentType;
    startDate: Date;
    endDate: Date
    batchId: string;
    certTemplates: { [key: string]: { [key: string]: string } };
    createdDate: Date;
    createdBy: string;
    createdDateText: string;
    createdFor: string[];
    endDateText: string;
    enrollmentEndDate: Date;
    enrollmentEndDateText: string;
    mentors: string[];
    startDateText: string;
    @IsEnum(Status)
    status: Status= Status.Value2;
    tandc: boolean;
    updatedDate: Date;
    updatedDateText: string;



}


