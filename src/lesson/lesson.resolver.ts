import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { StudentService } from 'src/student/student.service';
import { AssignStudentsToLessonDto } from './dto/assign-lesson.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { Lesson } from './entities/Lesson.entity';
import { LessonService } from './lesson.service';
import { LessonType } from './types/lesson.type';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}

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

  @Mutation(() => LessonType)
  assignLesson(
    @Args('assignStudentsToLesson')
    assignStudentsToLessonDto: AssignStudentsToLessonDto,
  ) {
    return this.lessonService.assignStudentsToLesson(
      assignStudentsToLessonDto.lessonId,
      assignStudentsToLessonDto.studentIds,
    );
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    return this.studentService.getManyStudents(lesson.students);
  }
}
