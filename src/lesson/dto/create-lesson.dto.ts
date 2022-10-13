import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDateString, IsString, IsUUID, MinLength } from 'class-validator';

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

  @Field(() => [ID], { defaultValue: [] })
  @IsUUID('4', { each: true })
  students: string[];
}
