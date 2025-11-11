export default function RecipeView({ name, id, preparation, favorite }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>{favorite ? "Favorite" : "Not Favorite"}</p>
      <h2>Preparation:</h2>
      <ul>
        {preparation.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
    </div>
  );
}
