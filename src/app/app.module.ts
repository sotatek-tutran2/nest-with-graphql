import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { Lesson } from '../lesson/entities/Lesson.entity';
import { upperDirectiveTransformer } from '../common/directives/upper-case.directive';
import { LessonModule } from '../lesson/lesson.module';
import { RecipesModule } from '../recipes/recipes.module';
import { StudentModule } from '../student/student.module';
import { Student } from '../student/entities/student.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/school_management',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Lesson, Student],
    }),
    LessonModule,
    RecipesModule,
    StudentModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      autoSchemaFile: true,
      playground: false,
      transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
  ],
})
export class AppModule {}
