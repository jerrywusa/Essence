"use client";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Header from "./header/header";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {pathname !== "/" && (
            <header
              className="sticky top-0"
              style={{
                backgroundColor: "#101010",
                zIndex: "100",
              }}
            >
              <Header />
            </header>
          )}
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
