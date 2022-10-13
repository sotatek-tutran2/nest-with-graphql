import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities/Lesson.entity';
import { LessonType } from './types/lesson.type';
import { v4 as uuid_v4 } from 'uuid';
import { CreateLessonDto } from './dto/create-lesson.dto';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  find(): Promise<LessonType[]> {
    return this.lessonRepository.find();
  }

  findById(id: string): Promise<LessonType> {
    return this.lessonRepository.findOneBy({ id });
  }

  async create(createLessonDto: CreateLessonDto): Promise<LessonType> {
    const lesson = this.lessonRepository.create({
      id: uuid_v4(),
      ...createLessonDto,
    });
    return this.lessonRepository.save(lesson);
  }

  async remove(id: string): Promise<boolean> {
    await this.lessonRepository.delete({ id });
    return true;
  }

  async assignStudentsToLesson(
    lessonId: string,
    studentIds: string[],
  ): Promise<Lesson | void> {
    const lesson = await this.lessonRepository.findOneBy({ id: lessonId });
    if (lesson) {
      lesson.students = [...(lesson.students || []), ...studentIds];
      return this.lessonRepository.save(lesson);
    }
  }
}
