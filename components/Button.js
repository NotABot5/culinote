export default function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="border-gray-400 cursor-pointer px-2 py-1 border-2 rounded-md m-2"
    >
      {children}
    </button>
  );
}
