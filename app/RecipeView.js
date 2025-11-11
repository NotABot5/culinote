"use client";
import Button from "@/components/Button";
import { useState } from "react";
import { updateRecipePreparation } from "./actions";

export default function RecipeView({
  name,
  id,
  preparation,
  favorite,
  setRecipes,
}) {
  const [toAddStep, setToAddStep] = useState("");
  return (
    <div>
      <h1>{name}</h1>
      <p>{favorite ? "Favorite" : "Not Favorite"}</p>
      <Button
        onClick={() =>
          setRecipes((prevRecipes) =>
            prevRecipes.map((recipe) =>
              recipe.id === id
                ? { ...recipe, favorite: !recipe.favorite }
                : recipe
            )
          )
        }
      >
        {favorite ? "Remove from favorites" : "Add to favorites"}
      </Button>
      <h2>Preparation:</h2>
      <ul>
        {preparation.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
      <input
        type="text"
        value={toAddStep}
        onChange={(e) => setToAddStep(e.target.value)}
      />
      <Button
        onClick={() => {
          setRecipes((prevRecipes) =>
            prevRecipes.map((recipe) =>
              recipe.id === id
                ? { ...recipe, preparation: [...recipe.preparation, toAddStep] }
                : recipe
            )
          );
          updateRecipePreparation(id, [...preparation, toAddStep]);
        }}
      >
        +
      </Button>
    </div>
  );
}
