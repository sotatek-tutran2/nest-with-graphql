import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class AssignStudentsToLessonDto {
  @Field(() => ID)
  @IsString()
  @IsUUID()
  lessonId: string;

  @Field(() => [ID])
  @IsUUID('4', { each: true })
  studentIds: string[];
}
