import { IsString, IsInt, IsOptional, IsObject,IsNotEmpty,NotEquals, isNotEmptyObject, IsNotEmptyObject } from 'class-validator';

export class Filter {

  @IsString()
  
  courseId: string;
}

export class getCourseBatchFilterDto {
  @IsObject()
  @IsNotEmptyObject()
  filters: Filter;
  @IsOptional()
  @IsInt()
  limit?: number;

  @IsString()
  @IsOptional()
  query?: string;
}
