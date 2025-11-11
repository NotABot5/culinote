"use client";
import { useState } from "react";
import { updateIngredient, deleteIngredient } from "./actions";
import Button from "@/components/Button";

export default function Ingredient({
  name,
  id,
  currProtein,
  currCarbs,
  currFats,
}) {
  const [proteinVal, setProteinVal] = useState(currProtein);
  const [carbsVal, setCarbsVal] = useState(currCarbs);
  const [fatsVal, setFatsVal] = useState(currFats);
  return (
    <div>
      <h2>Ingredient: {name}</h2>
      <p>Protein: </p>
      <input
        type="number"
        value={proteinVal}
        onChange={(e) => setProteinVal(e.target.value)}
      />
      <p>Carbs: </p>
      <input
        type="number"
        value={carbsVal}
        onChange={(e) => setCarbsVal(e.target.value)}
      />
      <p>Fats: </p>
      <input
        type="number"
        value={fatsVal}
        onChange={(e) => setFatsVal(e.target.value)}
      />
      <p>/per 100g</p>
      <Button
        onClick={() => updateIngredient(id, proteinVal, carbsVal, fatsVal)}
      >
        Update Ingredient
      </Button>
      <Button onClick={() => deleteIngredient(id)}>Delete Ingredient</Button>
    </div>
  );
}
