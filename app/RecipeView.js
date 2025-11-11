"use client";
import Button from "@/components/Button";
import { useState } from "react";
import { updateRecipePreparation, updateRecipeName } from "./actions";

export default function RecipeView({
  name,
  id,
  preparation,
  favorite,
  setRecipes,
}) {
  const [toAddStep, setToAddStep] = useState("");
  const [modifiedStepIndex, setModifiedStepIndex] = useState(-1);
  const [modifyingName, setModifyingName] = useState(false);
  const [newName, setNewName] = useState(name);
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
    </div>
  );
}
