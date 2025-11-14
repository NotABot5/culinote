"use client";
import { useState } from "react";
import Button from "@/components/Button";
import { addIngredientRelation, revalidateIngredientList } from "./actions";
import { useRouter } from "next/navigation";
import Textbox from "@/components/Textbox";

export default function RecipeAddIngredient({
  recipeId,
  allIngredients,
  setIngredientRelations,
  preferredLanguage,
}) {
  const [selectedIngredient, setSelectedIngredient] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("g");
  const router = useRouter();
  return (
    <div>
      <p>
        {preferredLanguage === "en"
          ? "Select ingredient:"
          : preferredLanguage === "nl"
          ? "Selecteer ingrediënt:"
          : "Wybierz składnik:"}
      </p>
      <select
        value={selectedIngredient}
        onChange={(e) => setSelectedIngredient(e.target.value)}
      >
        <option value={-1}>
          {preferredLanguage === "en"
            ? "Ingredient selection"
            : preferredLanguage === "nl"
            ? "Ingrediënt selectie"
            : "Wybór składnika"}
        </option>
        {allIngredients.map((ingredient) => (
          <option key={ingredient.id} value={ingredient.id}>
            {ingredient.name}
          </option>
        ))}
      </select>
      <p>
        {preferredLanguage === "en"
          ? "Quantity:"
          : preferredLanguage === "nl"
          ? "Hoeveelheid:"
          : "Ilość:"}
      </p>
      <Textbox
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <p>
        {preferredLanguage === "en"
          ? "Unit:"
          : preferredLanguage === "nl"
          ? "Eenheid:"
          : "Jednostka:"}
      </p>
      <Textbox
        type="text"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      />
      <Button
        onClick={async () => {
          if (selectedIngredient === -1 || quantity <= 0) {
            return;
          }
          const ingredient = allIngredients.find(
            (ing) => ing.id === parseInt(selectedIngredient)
          );

          const addedRelation = await addIngredientRelation(
            recipeId,
            selectedIngredient,
            quantity,
            unit
          );
          setIngredientRelations((prevRelations) => [
            ...prevRelations,
            {
              recipe_id: recipeId,
              ingredient_id: selectedIngredient,
              amount: quantity,
              unit: unit,
              id: addedRelation[0].id,
              ...ingredient,
            },
          ]);
          router.refresh();
          revalidateIngredientList();
          setSelectedIngredient("");
          setQuantity(0);
          setUnit("g");
        }}
      >
        {preferredLanguage === "en"
          ? "Add ingredient to recipe"
          : preferredLanguage === "nl"
          ? "Voeg ingrediënt toe aan recept"
          : "Dodaj składnik do przepisu"}
      </Button>
    </div>
  );
}
