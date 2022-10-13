import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { LessonService } from './lesson.service';
import { LessonType } from './types/lesson.type';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(private lessonService: LessonService) {}

  @Query(() => [LessonType])
  lessons() {
    return this.lessonService.find();
  }

  @Query(() => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonService.findById(id);
  }

  @Mutation(() => LessonType)
  createLesson(@Args('createLesson') createLessonDto: CreateLessonDto) {
    return this.lessonService.create(createLessonDto);
  }

  @Mutation(() => Boolean)
  async removeLesson(@Args('id') id: string) {
    return this.lessonService.remove(id);
  }
}
