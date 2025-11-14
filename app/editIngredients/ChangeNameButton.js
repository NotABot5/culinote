"use client";
import { useState } from "react";
import Button from "@/components/Button";
import { changeIngredientName } from "./actions";

export default function ChangeNameButton({ id }) {
  const [newName, setNewName] = useState("");
  return (
    <div>
      <Textbox
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <Button onClick={() => changeIngredientName(id, newName)}>
        Change Name
      </Button>
    </div>
  );
}
