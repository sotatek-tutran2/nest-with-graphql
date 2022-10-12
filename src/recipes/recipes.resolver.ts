import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription, Query } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { NewRecipeInputDto } from './dto/new-recipe.dto';
import { RecipesArgs } from './dto/recipe-args.dto';
import { Recipe } from './models/recipe.model';
import { RecipesService } from './recipes.service';

const pubSub = new PubSub();

@Resolver(() => Recipe)
export class RecipesResolver {
  constructor(private readonly recipesService: RecipesService) {}

  @Query(() => Recipe)
  async recipe(@Args('id') id: string): Promise<Recipe> {
    const recipe = await this.recipesService.findOneById(id);
    if (!recipe) {
      throw new NotFoundException(id);
    }
    return recipe;
  }

  @Query(() => [Recipe])
  recipes(@Args() recipesArgs: RecipesArgs): Promise<Recipe[]> {
    return this.recipesService.findAll(recipesArgs);
  }

  @Mutation(() => Recipe)
  async addRecipe(
    @Args('newRecipeData') newRecipeData: NewRecipeInputDto,
  ): Promise<Recipe> {
    const recipe = await this.recipesService.create(newRecipeData);
    pubSub.publish('recipeAdded', { recipeAdded: recipe });
    return recipe;
  }

  @Mutation(() => Boolean)
  async removeRecipe(@Args('id') id: string) {
    return this.recipesService.remove(id);
  }

  @Subscription(() => Recipe)
  recipeAdded() {
    return pubSub.asyncIterator('recipeAdded');
  }
}
