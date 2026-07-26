"use client";

import { motion } from "motion/react";
import { ProductCard } from "@/components/store/ProductCard";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { useState, useEffect } from "react";

// Datos de prueba temporales
const MOCK_PRODUCTS = [
  { id: "1", slug: "bandera-peru-grande", nombre: "Bandera del Perú Grande", precio: 25.00, precio_tachado: 35.00, imagen: "", oferta_flash: false },
  { id: "2", slug: "escarapelas-paquete", nombre: "Escarapelas (Paquete de 100)", precio: 15.00, precio_tachado: 20.00, imagen: "", oferta_flash: true },
  { id: "3", slug: "sombrero-rocoto", nombre: "Sombrero Rocoto Relleno", precio: 18.00, precio_tachado: 25.00, imagen: "", oferta_flash: true },
  { id: "4", slug: "matraca-arequipa", nombre: "Matraca Arequipa", precio: 12.00, imagen: "", oferta_flash: false },
  { id: "5", slug: "arbol-navidad", nombre: "Árbol de Navidad 1.5m", precio: 85.00, precio_tachado: 120.00, imagen: "", oferta_flash: false },
  { id: "6", slug: "luces-led", nombre: "Luces LED Navideñas", precio: 15.00, precio_tachado: 22.00, imagen: "", oferta_flash: true },
];

const CATEGORIAS = [
  { id: "todas", nombre: "Todo" },
  { id: "fiestas-patrias", nombre: "Fiestas Patrias" },
  { id: "fiestas-arequipa", nombre: "Fiestas Arequipa" },
  { id: "navidad", nombre: "Navidad" },
  { id: "feria-escolar", nombre: "Feria Escolar" },
];

export default function Home() {
  const [categoriaActiva, setCategoriaActiva] = useState("todas");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="flex flex-col gap-8 pb-8">
      {/* Hero */}
      <section className="bg-secondary px-4 py-12 md:py-20 text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="container mx-auto relative z-10"
        >
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-4">
            Celebra con <span className="text-primary">Rusmita</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Encuentra todo lo que necesitas para tus fiestas y campañas. ¡Donde tú sí importas!
          </p>
          <Link href="/categoria/novedades" className="inline-flex items-center justify-center bg-primary text-primary-foreground font-bold px-8 py-3 rounded-full hover:bg-primary/90 transition-transform active:scale-95">
            Ver Novedades
          </Link>
        </motion.div>
      </section>

      {/* Ofertas Flash */}
      <section className="container mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary to-[#C41A75] p-6 text-primary-foreground mb-6">
          <motion.div 
            className="absolute inset-0 bg-white/20 -skew-x-12 w-24"
            animate={{ x: ["-100%", "500%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-accent fill-accent" />
              <h2 className="font-heading text-2xl font-bold">Ofertas Flash</h2>
            </div>
            {mounted && (
              <div className="flex gap-2 font-heading text-2xl bg-black/20 px-4 py-2 rounded-lg">
                <span className="font-bold">02</span>:
                <span className="font-bold">45</span>:
                <span className="font-bold">12</span>
              </div>
            )}
          </div>
        </div>

        {/* Productos Flash */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          initial="hidden"
          animate="show"
        >
          {MOCK_PRODUCTS.filter(p => p.oferta_flash).map(producto => (
            <ProductCard key={producto.id} {...producto} />
          ))}
        </motion.div>
      </section>

      {/* Divisor con flecha */}
      <div className="container mx-auto px-4 py-4">
        <motion.div 
          className="h-[2px] bg-accent/20 relative"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ originX: 0 }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 border-t-2 border-r-2 border-accent rotate-45" />
        </motion.div>
      </div>

      {/* Categorías y Grilla principal */}
      <section className="container mx-auto px-4">
        <div className="flex overflow-x-auto pb-4 mb-4 gap-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoriaActiva(cat.id)}
              className={`relative px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                categoriaActiva === cat.id ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground bg-secondary"
              }`}
            >
              {categoriaActiva === cat.id && (
                <motion.div
                  layoutId="chip-activo"
                  className="absolute inset-0 bg-primary rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {cat.nombre}
            </button>
          ))}
        </div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          initial="hidden"
          animate="show"
        >
          {MOCK_PRODUCTS.map(producto => (
            <ProductCard key={producto.id} {...producto} />
          ))}
        </motion.div>
        
        {/* Placeholder para Scroll Infinito */}
        <div className="mt-8 text-center text-muted-foreground text-sm flex items-center justify-center gap-2">
           <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
           Cargando más productos...
        </div>
      </section>
    </div>
  );
}
