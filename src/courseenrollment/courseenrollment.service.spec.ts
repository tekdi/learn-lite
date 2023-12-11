import { Test, TestingModule } from '@nestjs/testing';
import { CourseenrollmentService } from './courseenrollment.service';

describe('CourseenrollmentService', () => {
  let service: CourseenrollmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseenrollmentService],
    }).compile();

    service = module.get<CourseenrollmentService>(CourseenrollmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
