import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentService } from './student.service';
import { StudentType } from './types/student.type';

@Resolver()
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Mutation(() => StudentType)
  createStudent(@Args('createStudent') createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Query(() => [StudentType])
  students() {
    return this.studentService.find();
  }

  @Query(() => StudentType)
  student(@Args('id') id: string) {
    return this.studentService.findById(id);
  }
}
