"use client";
import Button from "@/components/Button";
import RecipeView from "./RecipeView";
import { useState } from "react";

export default function Recipes({ startingLoaded }) {
  const [recipes, setRecipes] = useState(
    startingLoaded.map((r) => ({ ...r, favorite: false }))
  );
  const [currentRecipe, setCurrentRecipe] = useState(-1);
  return (
    <div>
      <div>
        <ul>
          {recipes.map((recipe, index) => (
            <li key={recipe.id}>
              <Button onClick={() => setCurrentRecipe(index)}>
                {recipe.name}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      {currentRecipe === -1 ? (
        <h1>Select recipe from list</h1>
      ) : (
        <RecipeView
          favorite={recipes[currentRecipe].favorite}
          id={recipes[currentRecipe].id}
          name={recipes[currentRecipe].name}
          preparation={recipes[currentRecipe].preparation}
        />
      )}
    </div>
  );
}
