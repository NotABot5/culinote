"use client";
import Button from "@/components/Button";
import { useState } from "react";

export default function ShoppingListAdder({ setShoppingList, allIngredients }) {
  const [selectedIngredient, setSelectedIngredient] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("g");
  const [ingredientAdderVisible, setIngredientAdderVisible] = useState(false);
  return (
    <div>
      {!ingredientAdderVisible && (
        <Button
          onClick={() => {
            setIngredientAdderVisible(true);
          }}
        >
          Add ingredient
        </Button>
      )}
      {ingredientAdderVisible && (
        <div>
          <hr />
          Add ingredient to shopping list:
          <br />
          <Button
            onClick={() => {
              setIngredientAdderVisible(false);
            }}
          >
            Cancel
          </Button>
          <br />
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
            onClick={async () => {
              if (selectedIngredient === -1 || quantity <= 0) {
                return;
              }
              const ingredient = allIngredients.find(
                (ing) => ing.id === parseInt(selectedIngredient)
              );
              setShoppingList((prev) => [
                ...prev,
                {
                  ingredient_id: selectedIngredient,
                  amount: quantity,
                  unit: unit,
                  ...ingredient,
                },
              ]);
              setIngredientAdderVisible(false);
            }}
          >
            Add ingredient
          </Button>
        </div>
      )}
      <hr />
    </div>
  );
}
