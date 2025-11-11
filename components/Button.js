export default function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="hover:bg-amber-200 p-1 border-2 rounded-md m-2"
    >
      {children}
    </button>
  );
}
