"use client";

export default function Textbox({ type, value, onChange }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="border-2 border-gray-400 rounded-md px-3 py-2 m-1 text-lg"
    />
  );
}
