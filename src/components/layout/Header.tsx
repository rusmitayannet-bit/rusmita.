"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, User, Menu, MapPin, ChevronDown, Heart } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useUIStore } from "@/store/ui";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export function Header() {
  const { items, setIsOpen } = useCartStore();
  const { setIsMegaMenuOpen } = useUIStore();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    setMounted(true);
    const supabase = createClient();
    
    // Obtener sesión actual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
  };

  const cartCount = items.reduce((acc, item) => acc + item.cantidad, 0);
  
  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border shadow-sm flex flex-col">
      {/* Top Bar (Ubicación y Ayuda) */}
      <div className="hidden lg:flex justify-between items-center px-4 py-1.5 border-b border-border text-[13px] text-muted-foreground max-w-[1440px] mx-auto w-full">
        <button className="flex items-center gap-1 hover:text-primary transition-colors">
          <MapPin className="w-4 h-4" />
          <span>Ingresa tu ubicación</span>
        </button>
        <div className="flex items-center gap-6">
          <button className="hover:text-primary transition-colors flex items-center gap-1">
            Vende con nosotros <ChevronDown className="w-3 h-3" />
          </button>
          <button className="hover:text-primary transition-colors flex items-center gap-1">
            Ayuda <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Header */}
      <div className="px-4 py-3 md:py-4 max-w-[1440px] mx-auto w-full flex items-center gap-4 lg:gap-8 justify-between">
        
        {/* Izquierda: Logo y Menú */}
        <div className="flex items-center gap-4 shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-[120px] h-10 lg:w-[150px] lg:h-12 shrink-0">
              <Image
                src="/logo-rusmita.png"
                alt="Logo Importadora Rusmita"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>
          
          {/* Botón Mega Menú (Desktop) */}
          <button 
            onClick={() => setIsMegaMenuOpen(true)}
            className="hidden lg:flex items-center gap-2 hover:bg-secondary px-3 py-2 rounded-lg transition-colors text-foreground font-medium"
          >
            <Menu className="w-6 h-6" />
            <span className="text-lg">Menú</span>
          </button>
        </div>

        {/* Centro: Búsqueda */}
        <div className="hidden md:flex flex-1 max-w-2xl relative group">
          <input
            type="text"
            placeholder="Buscar en Rusmita.com"
            className="w-full h-11 pl-5 pr-12 rounded-full border border-border bg-background focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-foreground text-base shadow-inner"
          />
          <button className="absolute right-1 top-1 bottom-1 w-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
            <Search className="h-5 w-5" />
          </button>
        </div>

        {/* Derecha: Cuenta y Carrito */}
        <div className="flex items-center gap-2 lg:gap-6 shrink-0">
          <button className="md:hidden p-2 text-foreground hover:text-primary transition-colors">
            <Search className="h-6 w-6" />
          </button>
          
          <div className="hidden lg:flex items-center gap-4">
            {mounted && user ? (
              <div className="flex items-center gap-2 group relative">
                <img 
                  src={user.user_metadata?.avatar_url || "https://placehold.co/100x100?text=User"} 
                  alt="Avatar" 
                  className="w-8 h-8 rounded-full border border-border"
                />
                <div className="flex flex-col items-start text-left cursor-pointer">
                  <span className="text-xs text-muted-foreground line-clamp-1 w-20">Hola, {user.user_metadata?.full_name?.split(' ')[0] || "Usuario"}</span>
                  <span className="text-sm font-bold text-foreground flex items-center gap-1 group-hover:text-primary transition-colors">
                    Mi Cuenta <ChevronDown className="w-4 h-4" />
                  </span>
                </div>
                {/* Menú desplegable */}
                <div className="absolute top-full right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex flex-col overflow-hidden">
                  <Link href="/mis-pedidos" className="px-4 py-3 text-sm text-foreground hover:bg-secondary transition-colors">Mis Pedidos</Link>
                  <button onClick={handleLogout} className="px-4 py-3 text-sm text-destructive hover:bg-destructive/10 text-left transition-colors border-t border-border">
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="flex flex-col items-start hover:text-primary transition-colors text-left group">
                <span className="text-xs text-muted-foreground">Hola,</span>
                <span className="text-sm font-bold text-foreground flex items-center gap-1 group-hover:text-primary">
                  Inicia sesión <ChevronDown className="w-4 h-4" />
                </span>
              </Link>
            )}
            <div className="w-px h-8 bg-border"></div>
            <button className="flex flex-col items-center hover:text-primary transition-colors">
              <span className="text-sm font-bold text-foreground">Mi cuenta</span>
            </button>
            <button className="p-2 text-foreground hover:text-primary transition-colors">
              <Heart className="h-6 w-6" />
            </button>
          </div>
          
          <button 
            onClick={() => setIsOpen(true)}
            className="relative p-2 text-foreground hover:text-primary transition-colors group flex items-center gap-2"
          >
            <div className="relative">
              <ShoppingCart className="h-7 w-7" />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-[11px] font-bold h-5 w-5 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden lg:block text-sm font-bold mt-1">S/ {items.reduce((acc, i) => acc + i.precio * i.cantidad, 0).toFixed(2)}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
