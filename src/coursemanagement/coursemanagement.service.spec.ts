import { Test, TestingModule } from '@nestjs/testing';
import { CoursemanagementService } from './coursemanagement.service';

describe('CoursemanagementService', () => {
  let service: CoursemanagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoursemanagementService],
    }).compile();

    service = module.get<CoursemanagementService>(CoursemanagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
