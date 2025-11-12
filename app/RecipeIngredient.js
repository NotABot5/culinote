import Button from "@/components/Button";
import { deleteIngredientRelation } from "./actions";

export default function RecipeIngredient({
  name,
  quantity,
  unit,
  id,
  setIngredientRelations,
  preferredLanguage,
}) {
  return (
    <div>
      <p>
        {name}: {quantity} {unit}
      </p>
      <Button
        onClick={() => {
          setIngredientRelations((prevRelations) =>
            prevRelations.filter((relation) => relation.id !== id)
          );
          deleteIngredientRelation(id);
        }}
      >
        {preferredLanguage === "en"
          ? "Delete ingredient"
          : preferredLanguage === "nl"
          ? "Verwijder ingrediënt"
          : "Usuń składnik"}
      </Button>
    </div>
  );
}
