"use client";
import Button from "@/components/Button";
import { useState } from "react";
import Textbox from "@/components/Textbox";

export default function ShoppingListAdder({
  setShoppingList,
  allIngredients,
  preferredLanguage,
}) {
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
          {preferredLanguage === "en"
            ? "Add ingredient"
            : preferredLanguage === "nl"
            ? "Voeg ingrediënt toe"
            : "Dodaj składnik"}
        </Button>
      )}
      {ingredientAdderVisible && (
        <div>
          <hr />
          {preferredLanguage === "en"
            ? "Add ingredient to shopping list:"
            : preferredLanguage === "nl"
            ? "Voeg ingrediënt toe aan boodschappenlijst:"
            : "Dodaj składnik do listy zakupów:"}
          <br />
          <Button
            onClick={() => {
              setIngredientAdderVisible(false);
            }}
          >
            {preferredLanguage === "en"
              ? "Cancel"
              : preferredLanguage === "nl"
              ? "Annuleren"
              : "Anuluj"}
          </Button>
          <br />
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
            {preferredLanguage === "en"
              ? "Add ingredient"
              : preferredLanguage === "nl"
              ? "Voeg ingrediënt toe"
              : "Dodaj składnik"}
          </Button>
        </div>
      )}
      <hr />
    </div>
  );
}
