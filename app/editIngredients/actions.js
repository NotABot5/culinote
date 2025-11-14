"use server";
import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";

export async function updateIngredient(id, protein, carbs, fats) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  await sql`UPDATE ingredients SET protein = ${protein}, carbs = ${carbs}, fat = ${fats} WHERE id = ${id}`;
  revalidatePath("/editIngredients");
  revalidatePath("/");
}

export async function deleteIngredient(id) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  await sql`DELETE FROM ingredients WHERE id = ${id}`;
  await sql`DELETE FROM ingredient_relations WHERE ingredient_id = ${id}`;
  revalidatePath("/editIngredients");
  revalidatePath("/");
}

export async function addIngredient(name) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  await sql`INSERT INTO ingredients (name, protein, carbs, fat) VALUES (${name}, 0, 0, 0)`;
  revalidatePath("/editIngredients");
  revalidatePath("/");
}

export async function changeIngredientName(id, newName) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  await sql`UPDATE ingredients SET name = ${newName} WHERE id = ${id}`;
  revalidatePath("/editIngredients");
  revalidatePath("/");
}
