export default function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="hover:bg-amber-200">
      {children}
    </button>
  );
}
