import "./globals.css";

export const metadata = {
  title: "Culinote",
  description: "Prototype recipe management app for CSE1105 course at TU Delft",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased p-2`}>{children}</body>
    </html>
  );
}
