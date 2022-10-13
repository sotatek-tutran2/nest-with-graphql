import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from './entities/student.entity';
import { v4 as uuid_v4 } from 'uuid';
import { StudentType } from './types/student.type';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  create(createStudentDto: CreateStudentDto): Promise<StudentType> {
    const newStudent = this.studentRepository.create({
      id: uuid_v4(),
      ...createStudentDto,
    });
    return this.studentRepository.save(newStudent);
  }

  find(): Promise<StudentType[]> {
    return this.studentRepository.find();
  }

  findById(id: string): Promise<StudentType> {
    return this.studentRepository.findOneBy({ id });
  }
}
