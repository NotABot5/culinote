import Link from "next/link";
import { neon } from "@neondatabase/serverless";
import Recipes from "./Recipes";

export default async function Home() {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const recipes = await sql`SELECT * FROM recipes`;
  const ingredients =
    await sql`SELECT * FROM ingredient_relations JOIN ingredients ON ingredient_relations.ingredient_id = ingredients.id`;
  const allIngredients = await sql`SELECT * FROM ingredients`;
  return (
    <div>
      <Link href="/editIngredients">Edit Ingredients</Link>
      <h1>Recipes</h1>
      <Recipes
        startingLoaded={recipes}
        loadedIngredients={ingredients}
        allIngredients={allIngredients}
      />
    </div>
  );
}
