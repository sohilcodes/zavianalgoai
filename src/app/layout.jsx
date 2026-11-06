import "./globals.css";

export const metadata = {
  title: "Compound Algo - Mini App",
  description: "Quotex Signals Algorithm App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body className="bg-[#07090e] text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
