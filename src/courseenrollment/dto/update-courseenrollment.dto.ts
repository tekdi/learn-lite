import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseenrollmentDto } from './create-courseenrollment.dto';

export class UpdateCourseenrollmentDto extends PartialType(CreateCourseenrollmentDto) {}
