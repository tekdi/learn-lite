import { Test, TestingModule } from '@nestjs/testing';
import { CourseenrollmentController } from './courseenrollment.controller';
import { CourseenrollmentService } from './courseenrollment.service';

describe('CourseenrollmentController', () => {
  let controller: CourseenrollmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseenrollmentController],
      providers: [CourseenrollmentService],
    }).compile();

    controller = module.get<CourseenrollmentController>(CourseenrollmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
