"use server";
import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";

export async function createRecipe(name) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  return await sql`INSERT INTO recipes (name, preparation) VALUES (${name}, ${[]}) RETURNING *`;
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
  await sql`INSERT INTO ingredient_relations (recipe_id, ingredient_id, amount, unit) VALUES (${recipeId}, ${ingredientId}, ${quantity}, ${unit})`;
  revalidatePath("/");
}
