import Link from "next/link";
import { neon } from "@neondatabase/serverless";
import Recipes from "./Recipes";

export default async function Home() {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const recipes = await sql`SELECT * FROM recipes`;
  return (
    <div>
      <Link href="/editIngredients">Edit Ingredients</Link>
      <h1>Recipes</h1>
      <Recipes startingLoaded={recipes} />
    </div>
  );
}
