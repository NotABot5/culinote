"use client";
import Button from "@/components/Button";
import RecipeView from "./RecipeView";
import { useState } from "react";
import { createRecipe, deleteRecipe } from "./actions";
import { useRouter } from "next/navigation";

export default function Recipes({ startingLoaded }) {
  const [recipes, setRecipes] = useState(
    startingLoaded.map((r) => ({ ...r, favorite: false }))
  );
  const [currentRecipe, setCurrentRecipe] = useState(-1);
  const [newRecipeName, setNewRecipeName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  return (
    <div>
      <hr />
      <h1>Search here:</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <hr />
      <div>
        <ul>
          {recipes
            .filter((prev) => {
              const allTerms = searchTerm.toLowerCase().split(" ");
              return allTerms.every((term) =>
                prev.name.toLowerCase().includes(term)
              );
            })
            .map((recipe, index) => (
              <li key={recipe.id}>
                <Button onClick={() => setCurrentRecipe(index)}>
                  {recipe.name} {recipe.favorite && "(favorite)"}
                </Button>
                <Button
                  onClick={() => {
                    setCurrentRecipe(-1);
                    setRecipes((prevRecipes) =>
                      prevRecipes.filter((r) => r.id !== recipe.id)
                    );
                    deleteRecipe(recipe.id);
                  }}
                >
                  Delete recipe
                </Button>
              </li>
            ))}
        </ul>
        <input
          type="text"
          value={newRecipeName}
          onChange={(e) => setNewRecipeName(e.target.value)}
        />
        <Button
          onClick={async () => {
            const created = (await createRecipe(newRecipeName))[0];
            setRecipes((prevRecipes) => [
              ...prevRecipes,
              { ...created, favorite: false },
            ]);
            setCurrentRecipe(recipes.length);
            router.refresh();
          }}
        >
          Add recipe
        </Button>
      </div>
      <hr />
      {currentRecipe === -1 ? (
        <h1>Select recipe from list</h1>
      ) : (
        <RecipeView
          favorite={recipes[currentRecipe].favorite}
          id={recipes[currentRecipe].id}
          name={recipes[currentRecipe].name}
          preparation={recipes[currentRecipe].preparation}
          setRecipes={setRecipes}
        />
      )}
    </div>
  );
}
