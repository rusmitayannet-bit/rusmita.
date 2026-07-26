import type { Metadata } from "next";
import { Inter, Fredoka } from "next/font/google";
import { StoreLayout } from "@/components/layout/StoreLayout";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Importadora Rusmita",
  description: "¡Donde tú sí importas!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${fredoka.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pb-16 md:pb-0">
        <StoreLayout>
          {children}
        </StoreLayout>
      </body>
    </html>
  );
}
