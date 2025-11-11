export default function RecipeIngredient({ name, quantity, unit, id }) {
  return (
    <div>
      {name}: {quantity} {unit}
    </div>
  );
}
