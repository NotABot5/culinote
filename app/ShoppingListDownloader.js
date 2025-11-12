"use client";

import Button from "@/components/Button";
import Link from "next/link";

export default function ShoppingListDownloader({ items, preferredLanguage }) {
  const shoppingListText =
    "Shopping list:\n" +
    items.map((ing) => `-${ing.amount} ${ing.unit} of ${ing.name}`).join("\n");
  const file = new Blob([shoppingListText], { type: "text/plain" });
  const fileURL = URL.createObjectURL(file);
  return (
    <Button>
      <Link href={fileURL} download={`shoppingList.txt`}>
        {preferredLanguage === "en"
          ? "Download shopping list"
          : preferredLanguage === "nl"
          ? "Download boodschappenlijst"
          : "Pobierz listę zakupów"}
      </Link>
    </Button>
  );
}
