import { Request, Response } from "express";

// Model
import {Recipe, RecipeDocument} from "../models/Recipe";
import {NativeError} from "mongoose";

/**
 * GET /
 * Home page.
 */
export const index = (req: Request, res: Response) => {
    Recipe.find((error: NativeError, recipes: RecipeDocument[]) => {
        res.render("recipes", {
            title: "Recipes",
            recipes: recipes
        });
    });
};

export const viewRecipe = (req: Request, res: Response) => {
    Recipe.findOne({
        creationHash: req.params.hash
    },(error: NativeError, recipe: RecipeDocument) => {
        res.render("recipe", {
            title: `Recipe: ${recipe.name}`,
            recipe: recipe
        });
    });
};