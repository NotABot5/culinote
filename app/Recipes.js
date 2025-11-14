"use client";
import Button from "@/components/Button";
import RecipeView from "./RecipeView";
import { useState } from "react";
import { createRecipe, deleteRecipe } from "./actions";
import { useRouter } from "next/navigation";
import ShoppingList from "./ShoppingList";

export default function Recipes({
  startingLoaded,
  loadedIngredients,
  allIngredients,
}) {
  const [recipes, setRecipes] = useState(
    startingLoaded.map((r) => ({ ...r, favorite: false }))
  );
  const [currentRecipe, setCurrentRecipe] = useState(-1);
  const [newRecipeName, setNewRecipeName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [ingredients, setIngredients] = useState(loadedIngredients);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [shoppingList, setShoppingList] = useState([]);
  const [shoppingListVisible, setShoppingListVisible] = useState(false);
  const [languageSelectorVisible, setLanguageSelectorVisible] = useState(false);
  const [preferredLanguage, setPreferredLanguage] = useState("en");
  const [knowsEnglish, setKnowsEnglish] = useState(true);
  const [knowsDutch, setKnowsDutch] = useState(false);
  const [knowsPolish, setKnowsPolish] = useState(false);
  const [newRecipeLang, setNewRecipeLang] = useState("en");
  const router = useRouter();
  const temp_recipes = recipes
    .filter((prev) => {
      const allTerms = searchTerm.toLowerCase().split(" ");
      return allTerms.every((term) => prev.name.toLowerCase().includes(term));
    })
    .filter((prev) => (showOnlyFavorites ? prev.favorite : true))
    .filter((prev) => {
      if (knowsEnglish && prev.language === "en") return true;
      if (knowsDutch && prev.language === "nl") return true;
      if (knowsPolish && prev.language === "pl") return true;
      return false;
    });
  return (
    <div>
      <Button
        onClick={() => setLanguageSelectorVisible(!languageSelectorVisible)}
      >
        Language select / taal selecteren / wybór języka
      </Button>
      {languageSelectorVisible && (
        <div>
          <Button onClick={() => setPreferredLanguage("en")}>English</Button>
          <Button onClick={() => setPreferredLanguage("nl")}>Nederlands</Button>
          <Button onClick={() => setPreferredLanguage("pl")}>Polski</Button>
          <div>
            {preferredLanguage === "en"
              ? "Select all languages you know:"
              : preferredLanguage === "nl"
              ? "Selecteer alle talen die je kent:"
              : "Wybierz wszystkie języki, które znasz:"}
            <br />
            <label>
              <input
                type="checkbox"
                checked={knowsEnglish}
                onChange={() => {
                  setCurrentRecipe(-1);
                  setKnowsEnglish(!knowsEnglish);
                }}
              />
              English
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                checked={knowsDutch}
                onChange={() => {
                  setCurrentRecipe(-1);
                  setKnowsDutch(!knowsDutch);
                }}
              />
              Nederlands
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                checked={knowsPolish}
                onChange={() => {
                  setCurrentRecipe(-1);
                  setKnowsPolish(!knowsPolish);
                }}
              />
              Polski
            </label>
          </div>
        </div>
      )}
      <hr />
      <h1>
        {preferredLanguage === "en"
          ? "Search here:"
          : preferredLanguage === "nl"
          ? "Zoek hier:"
          : "Szukaj tutaj:"}
      </h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setCurrentRecipe(-1);
          setSearchTerm(e.target.value);
        }}
      />
      <hr />
      <label>
        <input
          type="checkbox"
          checked={showOnlyFavorites}
          onChange={() => {
            setCurrentRecipe(-1);
            setShowOnlyFavorites(!showOnlyFavorites);
          }}
        />
        {preferredLanguage === "en"
          ? " Show favorites"
          : preferredLanguage === "nl"
          ? " Favorieten tonen"
          : " Pokaż ulubione"}
      </label>
      <hr />
      <div>
        <ul>
          {temp_recipes.map((recipe, index) => (
            <li key={recipe.id}>
              <Button onClick={() => setCurrentRecipe(index)}>
                {recipe.name}{" "}
                {preferredLanguage === "en"
                  ? recipe.favorite && "(favorite)"
                  : preferredLanguage === "nl"
                  ? recipe.favorite && "(favoriet)"
                  : recipe.favorite && "(ulubione)"}
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
                {preferredLanguage === "en"
                  ? "Delete recipe"
                  : preferredLanguage === "nl"
                  ? "Verwijder recept"
                  : "Usuń przepis"}
              </Button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={newRecipeName}
          onChange={(e) => setNewRecipeName(e.target.value)}
        />
        <select
          value={newRecipeLang}
          onChange={(e) => setNewRecipeLang(e.target.value)}
        >
          <option value="en">en</option>
          <option value="nl">nl</option>
          <option value="pl">pl</option>
        </select>
        <Button
          onClick={async () => {
            const created = (
              await createRecipe(newRecipeName, newRecipeLang)
            )[0];
            setRecipes((prevRecipes) => [
              ...prevRecipes,
              { ...created, favorite: false },
            ]);
            setCurrentRecipe(temp_recipes.length);
            router.refresh();
          }}
        >
          {preferredLanguage === "en"
            ? "Create new recipe"
            : preferredLanguage === "nl"
            ? "Maak nieuw recept"
            : "Utwórz nowy przepis"}
        </Button>
      </div>
      <hr />
      <Button
        onClick={() => {
          setShoppingListVisible((prev) => !prev);
        }}
      >
        {preferredLanguage === "en"
          ? shoppingListVisible
            ? "Hide shopping list"
            : "Show shopping list"
          : preferredLanguage === "nl"
          ? shoppingListVisible
            ? "Verberg boodschappenlijst"
            : "Toon boodschappenlijst"
          : shoppingListVisible
          ? "Ukryj listę zakupów"
          : "Pokaż listę zakupów"}
      </Button>
      {shoppingListVisible && (
        <ShoppingList
          shoppingListData={shoppingList}
          setShoppingList={setShoppingList}
          allIngredients={allIngredients}
          preferredLanguage={preferredLanguage}
        />
      )}
      <hr />
      {currentRecipe === -1 ? (
        <h1>
          {preferredLanguage === "en"
            ? "Select recipe from list"
            : preferredLanguage === "nl"
            ? "Selecteer recept uit lijst"
            : "Wybierz przepis z listy"}
        </h1>
      ) : (
        <RecipeView
          favorite={temp_recipes[currentRecipe].favorite}
          id={temp_recipes[currentRecipe].id}
          name={temp_recipes[currentRecipe].name}
          preparation={temp_recipes[currentRecipe].preparation}
          setRecipes={setRecipes}
          ingredients={ingredients.filter(
            (ing) => ing.recipe_id === temp_recipes[currentRecipe].id
          )}
          allIngredients={allIngredients}
          setIngredientRelations={setIngredients}
          setShoppingList={setShoppingList}
          preferredLanguage={preferredLanguage}
          language={temp_recipes[currentRecipe].language}
        />
      )}
    </div>
  );
}
