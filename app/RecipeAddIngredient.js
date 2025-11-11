"use client";
import { useState } from "react";
import Button from "@/components/Button";
import { addIngredientRelation } from "./actions";

export default function RecipeAddIngredient({
  recipeId,
  allIngredients,
  setIngredientRelations,
}) {
  const [selectedIngredient, setSelectedIngredient] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("g");
  return (
    <div>
      <p>Select ingredient:</p>
      <select
        value={selectedIngredient}
        onChange={(e) => setSelectedIngredient(e.target.value)}
      >
        <option value={-1}>Ingredient selection</option>
        {allIngredients.map((ingredient) => (
          <option key={ingredient.id} value={ingredient.id}>
            {ingredient.name}
          </option>
        ))}
      </select>
      <p>Quantity:</p>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <p>Unit:</p>
      <input
        type="text"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      />
      <Button
        onClick={() => {
          if (selectedIngredient === -1 || quantity <= 0) {
            return;
          }
          const ingredient = allIngredients.find(
            (ing) => ing.id === parseInt(selectedIngredient)
          );
          setIngredientRelations((prevRelations) => [
            ...prevRelations,
            {
              recipe_id: recipeId,
              ingredient_id: selectedIngredient,
              amount: quantity,
              unit: unit,
              ...ingredient,
            },
          ]);
          addIngredientRelation(recipeId, selectedIngredient, quantity, unit);
          setSelectedIngredient("");
          setQuantity(0);
          setUnit("g");
        }}
      >
        Add Ingredient to Recipe
      </Button>
    </div>
  );
}
