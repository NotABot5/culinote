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
  if (weight < 1000) {
    weight = weight + " g";
  } else {
    weight = weight / 1000 + " kg";
  }
  return (
    <div>
      <h1>{name}</h1>
      <Button onClick={() => setModifyingName(!modifyingName)}>
        {modifyingName ? "Cancel name change" : "Change recipe name"}
      </Button>
      {modifyingName && (
        <div>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
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
            Save Name
          </Button>
        </div>
      )}
      <RecipeDownloader
        name={name}
        preparation={preparation}
        ingredients={ingredients}
      />
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
        Add ingredients to shopping list
      </Button>
      <h2>Preparation:</h2>
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
              Delete step
            </Button>
            <Button onClick={() => setModifiedStepIndex(index)}>
              Modify step
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
                  Save
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
      <h2>Ingredients:</h2>
      <label>
        Scale ingredient quantities:{" "}
        <input
          type="number"
          value={scale}
          onChange={(e) => setScale(e.target.value)}
        />
      </label>
      <br />
      <label>
        Specify number of servings in recipe:{" "}
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
        />
      ))}
      <p>Total serving size: {weight}</p>
      <hr />
      <h2>Add ingredient:</h2>
      <RecipeAddIngredient
        recipeId={id}
        allIngredients={allIngredients}
        setIngredientRelations={setIngredientRelations}
      />
    </div>
  );
}
