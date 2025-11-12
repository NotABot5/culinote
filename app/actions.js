"use server";
import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";

export async function createRecipe(name, language) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  return await sql`INSERT INTO recipes (name, preparation, language) VALUES (${name}, ${[]}, ${language}) RETURNING *`;
}

export async function updateRecipePreparation(id, preparation) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  await sql`UPDATE recipes SET preparation = ${preparation} WHERE id = ${id}`;
  revalidatePath("/");
}

export async function deleteRecipe(id) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  await sql`DELETE FROM recipes WHERE id = ${id}`;
  revalidatePath("/");
}

export async function updateRecipeName(id, newName) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  await sql`UPDATE recipes SET name = ${newName} WHERE id = ${id}`;
  revalidatePath("/");
}

export async function addIngredientRelation(
  recipeId,
  ingredientId,
  quantity,
  unit
) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  return await sql`INSERT INTO ingredient_relations (recipe_id, ingredient_id, amount, unit) VALUES (${recipeId}, ${ingredientId}, ${quantity}, ${unit}) RETURNING *`;
}

export async function deleteIngredientRelation(id) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  await sql`DELETE FROM ingredient_relations WHERE id = ${id}`;
  revalidatePath("/");
}

export async function getIngredientData() {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const ingredients =
    await sql`SELECT ingredients.name, ingredients.id, ingredients.protein, ingredients.carbs, ingredients.fat, COUNT(*) AS relation_count FROM ingredients JOIN ingredient_relations ON ingredient_relations.ingredient_id = ingredients.id GROUP BY ingredients.id`;
  return ingredients;
}
