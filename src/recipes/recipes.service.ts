import { Injectable } from '@nestjs/common';
import { NewRecipeInputDto } from './dto/new-recipe.dto';
import { RecipesArgs } from './dto/recipe-args.dto';
import { Recipe } from './models/recipe.model';
import { v4 as uuid_v4 } from 'uuid';

@Injectable()
export class RecipesService {
  private recipes: Recipe[] = [];

  async create(data: NewRecipeInputDto): Promise<Recipe> {
    const newRecipe = {
      id: uuid_v4(),
      ...data,
      creationDate: new Date(),
    };
    this.recipes.push(newRecipe);
    return newRecipe;
  }
  async findOneById(id: string): Promise<Recipe> {
    return this.recipes.find((recipe) => recipe.id === id);
  }
  async findAll(recipesArgs: RecipesArgs): Promise<Recipe[]> {
    return this.recipes.slice(recipesArgs.skip, recipesArgs.take);
  }
  async remove(id: string): Promise<boolean> {
    const lastLength = this.recipes.length;

    this.recipes = this.recipes.filter((recipe) => recipe.id !== id);

    return this.recipes.length !== lastLength;
  }
}
