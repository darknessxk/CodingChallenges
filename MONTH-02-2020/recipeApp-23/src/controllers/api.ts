"use strict";

import { Response, Request, NextFunction } from "express";
import {Recipe, RecipeDocument, GenerateHash} from "../models/Recipe";
import {NativeError} from "mongoose";

/**
 * GET /api
 */
export const getApi = (req: Request, res: Response) => {
    res.send(JSON.stringify({
        response: "invalid endpoint"
    }));
};

/**
 * GET /api/v1/recipes
 */
export const getRecipes = (req: Request, res: Response) => {
    Recipe.find({}, (error: NativeError, recipe: RecipeDocument) => {
        res.send(JSON.stringify(recipe));
    });
};

/**
 * GET /api/v1/recipe/:hash
 */
export const getRecipe = (req: Request, res: Response) => {
    Recipe.find({
        creationHash: req.params.hash
    }, (error: NativeError, recipe: RecipeDocument) => {
        res.send(JSON.stringify(recipe));
    });
};

/**
 * PUT /api/v1/recipe
 */
export const putRecipe = (req: Request, res: Response) => {
    const RecipeItem: RecipeDocument = req.body as RecipeDocument;

    RecipeItem.creationHash = GenerateHash(RecipeItem);

    Recipe.create(RecipeItem)
        .catch(err => res.send(JSON.stringify({
            status: "error",
            code: err
        })))
        .then(response => res.send(JSON.stringify({
            status: "success",
            code: response,
            hash: RecipeItem.creationHash
        })));


};
