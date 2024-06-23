"use client";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Header from "./header/header";
import { usePathname } from 'next/navigation';


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
        {pathname !== '/' && (
            <header>
              <Header />
            </header>
          )}
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
