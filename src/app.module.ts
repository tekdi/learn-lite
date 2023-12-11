import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './orm.config';
import { CoursemanagementModule } from './coursemanagement/coursemanagement.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), CoursemanagementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
