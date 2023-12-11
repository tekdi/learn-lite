import { Test, TestingModule } from '@nestjs/testing';
import { CourseBatchService } from './coursemanagement.service';

describe('CoursemanagementService', () => {
  let service: CourseBatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseBatchService],
    }).compile();

    service = module.get<CourseBatchService>(CourseBatchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
