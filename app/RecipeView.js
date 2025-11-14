"use client";
import Button from "@/components/Button";
import { useState } from "react";
import { updateRecipePreparation, updateRecipeName } from "./actions";
import RecipeAddIngredient from "./RecipeAddIngredient";
import RecipeIngredient from "./RecipeIngredient";
import RecipeDownloader from "./RecipeDownloader";

export default function RecipeView({
  name,
  id,
  preparation,
  favorite,
  setRecipes,
  ingredients,
  allIngredients,
  setIngredientRelations,
  setShoppingList,
  language,
  preferredLanguage,
  setSelectedRecipe,
}) {
  const [toAddStep, setToAddStep] = useState("");
  const [modifiedStepIndex, setModifiedStepIndex] = useState(-1);
  const [modifyingName, setModifyingName] = useState(false);
  const [newName, setNewName] = useState(name);
  const [scale, setScale] = useState(1);
  const [servings, setServings] = useState(1);
  let weight =
    (ingredients.reduce((total, ingredient) => {
      return ingredient.unit === "g"
        ? Number(total) + Number(ingredient.amount)
        : ingredient.unit === "kg"
        ? Number(ingredient.amount) * 1000 + Number(total)
        : Number(total);
    }, 0) /
      servings) *
    scale;
  let totalCalories =
    (ingredients.reduce((total, ingredient) => {
      return (
        Number(total) +
        ((ingredient.carbs * 4 + ingredient.protein * 4 + ingredient.fat * 9) *
          Number(ingredient.amount)) /
          100
      );
    }, 0) /
      servings) *
    scale;
  let caloriesIn100g = (totalCalories / weight) * 100;
  if (weight < 1000) {
    weight = weight + " g";
  } else {
    weight = weight / 1000 + " kg";
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">
        {preferredLanguage === "en"
          ? "Current recipe: "
          : preferredLanguage === "nl"
          ? "Huidig recept: "
          : "Aktualny przepis: "}
        {name}
      </h1>
      <h2>
        {preferredLanguage === "en"
          ? "Language: "
          : preferredLanguage === "nl"
          ? "Taal: "
          : "Język: "}
        {language}
      </h2>
      <Button onClick={() => setModifyingName(!modifyingName)}>
        {modifyingName
          ? preferredLanguage === "en"
            ? "Cancel name change"
            : preferredLanguage === "nl"
            ? "Annuleer naamswijziging"
            : "Anuluj zmianę nazwy"
          : preferredLanguage === "en"
          ? "Change recipe name"
          : preferredLanguage === "nl"
          ? "Wijzig receptnaam"
          : "Zmień nazwę przepisu"}
      </Button>
      {modifyingName && (
        <div>
          <input
            type="text"
            value={newName}
            onChange={(e) => {
              setSelectedRecipe(-1);
              setNewName(e.target.value);
            }}
          />
          <Button
            onClick={() => {
              setRecipes((prevRecipes) =>
                prevRecipes.map((recipe) =>
                  recipe.id === id ? { ...recipe, name: newName } : recipe
                )
              );
              setModifyingName(false);
              updateRecipeName(id, newName);
            }}
          >
            {preferredLanguage === "en"
              ? "Save name"
              : preferredLanguage === "nl"
              ? "Sla naam op"
              : "Zapisz"}
          </Button>
        </div>
      )}
      <RecipeDownloader
        name={name}
        preparation={preparation}
        ingredients={ingredients}
        preferredLanguage={preferredLanguage}
      />
      <p>
        {favorite
          ? preferredLanguage === "en"
            ? "Favorite"
            : preferredLanguage === "nl"
            ? "Favoriet"
            : "Ulubione"
          : preferredLanguage === "en"
          ? "Not Favorite"
          : preferredLanguage === "nl"
          ? "Niet favoriet"
          : "Nie ulubione"}
      </p>
      <Button
        onClick={() =>
          setRecipes((prevRecipes) => {
            setSelectedRecipe(-1);
            prevRecipes.map((recipe) =>
              recipe.id === id
                ? { ...recipe, favorite: !recipe.favorite }
                : recipe
            );
          })
        }
      >
        {favorite
          ? preferredLanguage === "en"
            ? "Remove from favorites"
            : preferredLanguage === "nl"
            ? "Verwijder uit favorieten"
            : "Usuń z ulubionych"
          : preferredLanguage === "en"
          ? "Add to favorites"
          : preferredLanguage === "nl"
          ? "Toevoegen aan favorieten"
          : "Dodaj do ulubionych"}
      </Button>
      <Button
        onClick={() => {
          setShoppingList((prevShoppingList) => {
            return [
              ...prevShoppingList,
              ...ingredients.map((from) => {
                return { ...from, source: name };
              }),
            ];
          });
        }}
      >
        {preferredLanguage === "en"
          ? "Add ingredients to shopping list"
          : preferredLanguage === "nl"
          ? "Voeg ingrediënten toe aan boodschappenlijst"
          : "Dodaj składniki do listy zakupów"}
      </Button>
      <h2>
        {preferredLanguage === "en"
          ? "Preparation:"
          : preferredLanguage === "nl"
          ? "Bereiding:"
          : "Przygotowanie:"}
      </h2>
      <ul>
        {preparation.map((step, index) => (
          <li key={index}>
            {step}
            <Button
              onClick={() => {
                const newPreparation = preparation.filter(
                  (a, i) => i !== index
                );
                setRecipes((prevRecipes) =>
                  prevRecipes.map((recipe) =>
                    recipe.id === id
                      ? { ...recipe, preparation: newPreparation }
                      : recipe
                  )
                );
                updateRecipePreparation(id, newPreparation);
              }}
            >
              {preferredLanguage === "en"
                ? "Delete step"
                : preferredLanguage === "nl"
                ? "Verwijder stap"
                : "Usuń krok"}
            </Button>
            <Button onClick={() => setModifiedStepIndex(index)}>
              {preferredLanguage === "en"
                ? "Modify step"
                : preferredLanguage === "nl"
                ? "Wijzig stap"
                : "Zmień krok"}
            </Button>
            {modifiedStepIndex === index && (
              <div>
                <input
                  type="text"
                  value={preparation[index]}
                  onChange={(e) => {
                    const newPreparation = [...preparation];
                    newPreparation[index] = e.target.value;
                    setRecipes((prevRecipes) =>
                      prevRecipes.map((recipe) =>
                        recipe.id === id
                          ? { ...recipe, preparation: newPreparation }
                          : recipe
                      )
                    );
                  }}
                />
                <Button
                  onClick={() => {
                    updateRecipePreparation(id, preparation);
                    setModifiedStepIndex(-1);
                  }}
                >
                  {preferredLanguage === "en"
                    ? "Save"
                    : preferredLanguage === "nl"
                    ? "Opslaan"
                    : "Zapisz"}
                </Button>
              </div>
            )}
          </li>
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
      <h2>
        {preferredLanguage === "en"
          ? "Ingredients:"
          : preferredLanguage === "nl"
          ? "Ingrediënten:"
          : "Składniki:"}
      </h2>
      <label>
        {preferredLanguage === "en"
          ? "Scale ingredient quantities: "
          : preferredLanguage === "nl"
          ? "Schaal ingrediëntenhoeveelheden: "
          : "Skaluj ilości składników: "}
        <input
          type="number"
          value={scale}
          onChange={(e) => setScale(e.target.value)}
        />
      </label>
      <br />
      <label>
        {preferredLanguage === "en"
          ? "Specify number of servings in recipe: "
          : preferredLanguage === "nl"
          ? "Geef het aantal porties in het recept op: "
          : "Określ liczbę porcji w przepisie: "}
        <input
          type="number"
          value={servings}
          onChange={(e) => setServings(e.target.value)}
        />
      </label>
      {ingredients.map((ingredient, index) => (
        <RecipeIngredient
          key={index}
          name={ingredient.name}
          quantity={ingredient.amount * scale}
          unit={ingredient.unit}
          id={ingredient.id}
          setIngredientRelations={setIngredientRelations}
          preferredLanguage={preferredLanguage}
        />
      ))}
      <p>
        {preferredLanguage === "en"
          ? `Total serving size: ${weight}`
          : preferredLanguage === "nl"
          ? `Totale portiegrootte: ${weight}`
          : `Całkowity rozmiar porcji: ${weight}`}
      </p>
      <p>kcal/100g: {caloriesIn100g.toFixed(1)}</p>
      <hr />
      <h2 className="text-2xl">
        {preferredLanguage === "en"
          ? "Add ingredient:"
          : preferredLanguage === "nl"
          ? "Ingrediënt toevoegen:"
          : "Dodaj składnik:"}
      </h2>
      <RecipeAddIngredient
        recipeId={id}
        allIngredients={allIngredients}
        setIngredientRelations={setIngredientRelations}
        preferredLanguage={preferredLanguage}
      />
    </div>
  );
}
