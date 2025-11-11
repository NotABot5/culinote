import { neon } from "@neondatabase/serverless";
import Ingredient from "./Ingredient";
import AddIngredientButton from "./AddIngredientButton";
import Link from "next/link";

export default async function EditIngredientsPage() {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const ingredients = await sql`SELECT * FROM ingredients`;
  return (
    <div>
      {ingredients
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((ingredient) => (
          <Ingredient
            key={ingredient.id}
            name={ingredient.name}
            id={ingredient.id}
            currProtein={ingredient.protein}
            currCarbs={ingredient.carbs}
            currFats={ingredient.fat}
          />
        ))}
      <AddIngredientButton />
      <hr />
      <Link href="/">Exit edit ingredients view</Link>
    </div>
  );
}
