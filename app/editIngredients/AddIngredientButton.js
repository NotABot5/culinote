"use client";
import { addIngredient } from "./actions";
import Button from "@/components/Button";
import { useState } from "react";
import Textbox from "@/components/Textbox";

export default function AddIngredientButton() {
  const [name, setName] = useState("");

  return (
    <div>
      <Textbox
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button onClick={() => addIngredient(name)}>Add Ingredient</Button>
    </div>
  );
}
