"use client";

import Button from "@/components/Button";
import Link from "next/link";

export default function RecipeDownloader({ name, preparation, ingredients }) {
  const recipeText =
    name +
    "\n\nIngredients:\n" +
    ingredients
      .map((ing) => `-${ing.amount} ${ing.unit} ${ing.name}`)
      .join("\n") +
    "\n\nPreparation:\n" +
    preparation.map((step, index) => `${index + 1}. ${step}`).join("\n");
  const file = new Blob([recipeText], { type: "text/plain" });
  const fileURL = URL.createObjectURL(file);
  return (
    <Button>
      <Link href={fileURL} download={`${name}.txt`}>
        Download Recipe
      </Link>
    </Button>
  );
}
