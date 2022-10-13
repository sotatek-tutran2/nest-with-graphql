import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class CreateStudentDto {
  @Field()
  @IsString()
  @MinLength(1)
  firstName: string;

  @Field()
  @IsString()
  @MinLength(1)
  lastName: string;
}
