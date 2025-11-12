"use client";

import Button from "@/components/Button";
import Link from "next/link";

export default function ShoppingListDownloader({ items }) {
  const shoppingListText =
    "Shopping list:\n" +
    items.map((ing) => `-${ing.amount} ${ing.unit} of ${ing.name}`).join("\n");
  const file = new Blob([shoppingListText], { type: "text/plain" });
  const fileURL = URL.createObjectURL(file);
  return (
    <Button>
      <Link href={fileURL} download={`shoppingList.txt`}>
        Download shopping list
      </Link>
    </Button>
  );
}
