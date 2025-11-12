"use client";
import { useState } from "react";
import { updateIngredient, deleteIngredient } from "./actions";
import ChangeNameButton from "./ChangeNameButton";
import Button from "@/components/Button";

export default function Ingredient({
  name,
  id,
  currProtein,
  currCarbs,
  currFats,
  usedInRecipes,
}) {
  const [proteinVal, setProteinVal] = useState(currProtein);
  const [carbsVal, setCarbsVal] = useState(currCarbs);
  const [fatsVal, setFatsVal] = useState(currFats);
  const [changeNameShown, setChangeNameShown] = useState(false);
  return (
    <div>
      <h2>Ingredient: {name}</h2>
      <Button onClick={() => setChangeNameShown(!changeNameShown)}>
        {changeNameShown ? "Hide Change Name" : "Show Change Name"}
      </Button>
      {changeNameShown && <ChangeNameButton id={id} />}
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
      <p>kcal/100g: {proteinVal * 4 + carbsVal * 4 + fatsVal * 9}</p>
      <Button
        onClick={() => updateIngredient(id, proteinVal, carbsVal, fatsVal)}
      >
        Update Ingredient
      </Button>
      <Button onClick={() => deleteIngredient(id)}>Delete Ingredient</Button>
      <p>{usedInRecipes} - used in this many recipes</p>
      <hr />
    </div>
  );
}
