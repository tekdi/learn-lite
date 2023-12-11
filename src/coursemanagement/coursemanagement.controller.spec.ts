import { Test, TestingModule } from '@nestjs/testing';
import { CourseBatchController } from './coursemanagement.controller';
import { CourseBatchService } from './coursemanagement.service';

describe('CoursemanagementController', () => {
  let controller: CourseBatchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseBatchController],
      providers: [CourseBatchService],
    }).compile();

    controller = module.get<CourseBatchController>(CourseBatchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
