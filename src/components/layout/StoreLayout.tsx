"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { CartDrawer } from "@/components/store/CartDrawer";
import { MegaMenu } from "@/components/layout/MegaMenu";

export function StoreLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Si estamos en cualquier ruta de /admin, NO renderizamos los componentes de la tienda
  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileNav />
      <CartDrawer />
      <MegaMenu />
    </>
  );
}
