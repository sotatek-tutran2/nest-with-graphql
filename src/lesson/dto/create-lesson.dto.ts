import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateLessonDto {
  @Field()
  @IsString()
  @MinLength(10)
  name: string;

  @Field()
  @IsDateString()
  startDate: string;

  @Field()
  @IsDateString()
  endDate: string;
}
