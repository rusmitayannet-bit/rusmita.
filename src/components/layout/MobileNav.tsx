"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, ShoppingCart, User } from "lucide-react";
import { motion } from "motion/react";
import { useCartStore } from "@/store/cart";
import { useEffect, useState } from "react";

export function MobileNav() {
  const pathname = usePathname();
  const { items, setIsOpen } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartCount = items.reduce((acc, item) => acc + item.cantidad, 0);

  const navItems = [
    { name: "Inicio", href: "/", icon: Home },
    { name: "Categorías", href: "/categoria", icon: LayoutGrid },
    { name: "Carrito", href: "/carrito", icon: ShoppingCart, badge: 0 },
    { name: "Cuenta", href: "/cuenta", icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 w-full bg-background border-t border-border z-50 pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          if (item.name === "Carrito") {
            return (
              <button
                key={item.name}
                onClick={() => setIsOpen(true)}
                className="relative flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-primary transition-colors"
              >
                <div className="relative">
                  <Icon className="h-6 w-6" />
                  {mounted && cartCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-primary text-primary-foreground text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-1 font-medium">
                  {item.name}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className="relative flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-primary transition-colors"
            >
              <div className="relative">
                <Icon className={`h-6 w-6 ${isActive ? "text-primary" : ""}`} />
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-active"
                    className="absolute inset-0 bg-primary/20 rounded-full scale-150 -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </div>
              <span className={`text-[10px] mt-1 font-medium ${isActive ? "text-primary" : ""}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
