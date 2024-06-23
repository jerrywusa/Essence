import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Header from "./header/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <header>
            <Header />
          </header>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
