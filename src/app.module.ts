import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseenrollmentModule } from './courseenrollment/courseenrollment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './orm.config';

@Module({
  imports: [CourseenrollmentModule,TypeOrmModule.forRoot(config)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
