import { IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateBatchemanagementDto } from './create-coursemanagement.dto';
import { EnrollmentType, Status } from '../entities/coursemanagement.entity';

export class UpdateBatchemanagementDto extends PartialType(CreateBatchemanagementDto) {

    
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
