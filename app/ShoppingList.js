import ShoppingListAdder from "./ShoppingListAdder";
import ShoppingListDownloader from "./ShoppingListDownloader";
import Button from "@/components/Button";

export default function ShoppingList({
  shoppingListData,
  setShoppingList,
  allIngredients,
}) {
  return (
    <div>
      <h2>Shopping list:</h2>
      <ul>
        {shoppingListData.map((item, index) => {
          return (
            <li key={index}>
              - {item.amount} {item.unit}: {item.name}{" "}
              {item.source && `(from recipe ${item.source})`}
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
      <ShoppingListAdder
        setShoppingList={setShoppingList}
        allIngredients={allIngredients}
      />
      <ShoppingListDownloader items={shoppingListData} />
    </div>
  );
}
