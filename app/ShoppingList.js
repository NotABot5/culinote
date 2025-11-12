import ShoppingListDownloader from "./ShoppingListDownloader";

export default function ShoppingList({ shoppingListData, setShoppingList }) {
  console.log(shoppingListData);
  return (
    <div>
      <h2>Shopping list:</h2>
      <ul>
        {shoppingListData.map((item, index) => {
          return (
            <li key={index}>
              - {item.amount} {item.unit}: {item.name}{" "}
              {item.source && `(from recipe ${item.source})`}
            </li>
          );
        })}
      </ul>
      <ShoppingListDownloader items={shoppingListData} />
    </div>
  );
}
