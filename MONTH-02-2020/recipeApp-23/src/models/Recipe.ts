import mongoose from "mongoose";
import { createHash } from "crypto";

export type RecipeDocument = mongoose.Document & {
    name: string;
    description: string;
    author: string;
    bakingTime: string;
    ingredients: string[];
    imageUrl: string;
    images: string[];
    steps: string[];
    creationHash: string;
};

const recipeSchema = new mongoose.Schema({
    name: String,
    description: String,
    author: String,
    ingredients: [String],
    steps: [String],
    bakingTime: String,

    imageUrl: String,
    images: [String],

    creationHash: {
        type: String,
        index: true
    }
}, { timestamps: true });

export const GenerateHash = (recipe: RecipeDocument): string => {
    const hash = createHash("sha256");
    return hash.update(`${recipe.name}${recipe.author}`).digest("hex");
};

export const Recipe = mongoose.model<RecipeDocument>("Recipe", recipeSchema);
