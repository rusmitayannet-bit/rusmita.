"use client";

import { useUIStore } from "@/store/ui";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const CATEGORIAS = [
  {
    id: "ofertas",
    nombre: "Oportunidades Únicas",
    badge: "SALE",
    subcategorias: [
      { titulo: "Destacados", items: ["Liquidación", "Ofertas Flash", "Últimas unidades"] }
    ]
  },
  {
    id: "fiestas-patrias",
    nombre: "Fiestas Patrias",
    subcategorias: [
      { titulo: "Decoración", items: ["Banderas", "Escarapelas", "Guirnaldas", "Globos"] },
      { titulo: "Vestimenta", items: ["Polos Perú", "Gorros", "Chalinas"] }
    ]
  },
  {
    id: "navidad",
    nombre: "Navidad",
    subcategorias: [
      { titulo: "Árboles", items: ["Pinos Verdes", "Nevados", "Miniaturas"] },
      { titulo: "Luces", items: ["Cascadas", "Mangueras", "Luces LED", "Musicales"] },
      { titulo: "Adornos", items: ["Bambalinas", "Estrellas", "Pesebres", "Coronas"] }
    ]
  },
  {
    id: "escolar",
    nombre: "Campaña Escolar",
    subcategorias: [
      { titulo: "Útiles", items: ["Cuadernos", "Lápices", "Colores", "Plumones"] },
      { titulo: "Mochilas", items: ["Con Ruedas", "De Espalda", "Loncheras", "Cartucheras"] }
    ]
  },
  {
    id: "hogar",
    nombre: "Hogar y Decoración",
    subcategorias: [
      { titulo: "Menaje", items: ["Vasos", "Platos", "Cubiertos"] },
      { titulo: "Organización", items: ["Cajas Plásticas", "Tapers", "Repisas"] }
    ]
  }
];

export function MegaMenu() {
  const { isMegaMenuOpen, setIsMegaMenuOpen } = useUIStore();
  const [activeCategory, setActiveCategory] = useState(CATEGORIAS[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isMegaMenuOpen && (
        <>
          {/* Overlay oscuro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMegaMenuOpen(false)}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />

          {/* Drawer Principal */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 w-[85vw] md:w-[700px] lg:w-[900px] bg-background shadow-2xl z-50 flex flex-col md:flex-row overflow-hidden"
          >
            {/* Header del Drawer (Mobile) */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground">
              <span className="font-heading font-bold text-lg">¡Hola!</span>
              <button onClick={() => setIsMegaMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Columna Izquierda: Lista de Categorías */}
            <div className="w-full md:w-64 bg-background md:bg-secondary/30 border-r border-border h-full overflow-y-auto flex flex-col">
              <div className="hidden md:flex items-center justify-between p-4 border-b border-border">
                <span className="font-heading font-bold text-xl text-foreground">¡Hola!</span>
                <button onClick={() => setIsMegaMenuOpen(false)} className="text-muted-foreground hover:text-primary transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 py-2">
                {CATEGORIAS.map((cat) => {
                  const isActive = activeCategory.id === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onMouseEnter={() => setActiveCategory(cat)}
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${
                        isActive 
                          ? "bg-background text-primary border-l-4 border-primary shadow-sm" 
                          : "text-foreground hover:bg-secondary border-l-4 border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {cat.nombre}
                        {cat.badge && (
                          <span className="px-1.5 py-0.5 bg-accent text-accent-foreground text-[10px] rounded-full font-bold">
                            {cat.badge}
                          </span>
                        )}
                      </div>
                      <ChevronRight className={`w-4 h-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Columna Derecha: Subcategorías */}
            <div className="hidden md:block flex-1 bg-background h-full overflow-y-auto p-8">
              {/* Banner / Título de Categoría Activa */}
              <div className="w-full bg-[#84C32E] rounded-xl p-4 mb-8 flex items-center justify-between text-white shadow-md">
                <span className="font-heading font-bold text-xl">{activeCategory.nombre}</span>
                <Link 
                  href={`/categoria/${activeCategory.id}`}
                  onClick={() => setIsMegaMenuOpen(false)} 
                  className="text-sm underline hover:opacity-80"
                >
                  Ver todo
                </Link>
              </div>

              {/* Grilla de Subcategorías */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                {activeCategory.subcategorias.map((sub, idx) => (
                  <div key={idx} className="flex flex-col gap-3">
                    <h3 className="font-bold text-foreground text-base border-b border-border pb-1">
                      {sub.titulo}
                    </h3>
                    <div className="flex flex-col gap-2">
                      {sub.items.map((item, i) => (
                        <Link
                          key={i}
                          href={`/categoria/${activeCategory.id}?filtro=${item.toLowerCase()}`}
                          onClick={() => setIsMegaMenuOpen(false)}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
