"use server";
import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";

export async function updateIngredient(id, protein, carbs, fats) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  console.log("Updating ingredient:", id, protein, carbs, fats);
  await sql`UPDATE ingredients SET protein = ${protein}, carbs = ${carbs}, fat = ${fats} WHERE id = ${id}`;
  revalidatePath("/editIngredients");
}

export async function deleteIngredient(id) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  console.log("Deleting ingredient:", id);
  await sql`DELETE FROM ingredients WHERE id = ${id}`;
  revalidatePath("/editIngredients");
}

export async function addIngredient(name) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  console.log("Adding ingredient:", name);
  await sql`INSERT INTO ingredients (name, protein, carbs, fat) VALUES (${name}, 0, 0, 0)`;
  revalidatePath("/editIngredients");
}
