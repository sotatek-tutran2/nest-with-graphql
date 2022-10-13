import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/student/entities/student.entity';
import { StudentModule } from 'src/student/student.module';
import { Lesson } from './entities/Lesson.entity';
import { LessonResolver } from './lesson.resolver';
import { LessonService } from './lesson.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, Student]), StudentModule],
  providers: [LessonResolver, LessonService],
})
export class LessonModule {}
