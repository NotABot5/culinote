import ShoppingListAdder from "./ShoppingListAdder";
import ShoppingListDownloader from "./ShoppingListDownloader";
import Button from "@/components/Button";

export default function ShoppingList({
  shoppingListData,
  setShoppingList,
  allIngredients,
  preferredLanguage,
}) {
  return (
    <div>
      <h2>
        {preferredLanguage === "en"
          ? "Shopping list:"
          : preferredLanguage === "nl"
          ? "Boodschappenlijst:"
          : "Lista zakupów:"}
      </h2>
      <ul>
        {shoppingListData.map((item, index) => {
          return (
            <li key={index}>
              - {item.amount} {item.unit}: {item.name}{" "}
              {item.source &&
                (preferredLanguage === "en"
                  ? `(from recipe ${item.source})`
                  : preferredLanguage === "nl"
                  ? `(van recept ${item.source})`
                  : `(z przepisu ${item.source})`)}
              <Button
                onClick={() => {
                  setShoppingList((prev) => {
                    return prev.filter((value, indexp) => {
                      return indexp !== index;
                    });
                  });
                }}
              >
                Delete item
              </Button>
            </li>
          );
        })}
      </ul>
      <Button
        onClick={() => {
          setShoppingList(() => []);
        }}
      >
        {preferredLanguage === "en"
          ? "Reset shopping list"
          : preferredLanguage === "nl"
          ? "Leeg boodschappenlijst"
          : "Wyczyść listę zakupów"}
      </Button>
      <ShoppingListAdder
        setShoppingList={setShoppingList}
        allIngredients={allIngredients}
        preferredLanguage={preferredLanguage}
      />
      <ShoppingListDownloader
        items={shoppingListData}
        preferredLanguage={preferredLanguage}
      />
    </div>
  );
}
