import Ingredient from "./Ingredient";
import AddIngredientButton from "./AddIngredientButton";
import Link from "next/link";
import { neon } from "@neondatabase/serverless";

export default async function EditIngredientsPage() {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const ingredients =
    await sql`SELECT ingredients.name, ingredients.id, ingredients.protein, ingredients.carbs, ingredients.fat, COALESCE(COUNT(ingredient_relations.id), 0) AS relation_count FROM ingredients LEFT JOIN ingredient_relations ON ingredient_relations.ingredient_id = ingredients.id GROUP BY ingredients.id`;
  console.log(ingredients);
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
            usedInRecipes={ingredient.relation_count}
          />
        ))}
      <AddIngredientButton />
      <hr />
      <Link href="/">Exit edit ingredients view</Link>
    </div>
  );
}
