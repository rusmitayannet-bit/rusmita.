"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { ProductCard } from "@/components/store/ProductCard";
import { useCartStore } from "@/store/cart";

const MOCK_PRODUCT = {
  id: "1",
  nombre: "Bandera del Perú Grande",
  precio: 25.00,
  precio_tachado: 35.00,
  descripcion: "Bandera oficial de tela con escudo, tamaño 150x90cm. Ideal para desfiles, decoración de casas y negocios por Fiestas Patrias. Material resistente a la intemperie.",
  rating: 4.8,
  reviews: 124,
  imagenes: [
    "", // Placeholder 1
    "", // Placeholder 2
  ],
  variantes: [
    { nombre: "Tamaño", opciones: ["150x90cm", "200x120cm"] },
    { nombre: "Material", opciones: ["Tela", "Raso"] }
  ]
};

export default function ProductoPage() {
  const [imgActiva, setImgActiva] = useState(0);
  const [cantidad, setCantidad] = useState(1);
  const [varianteActiva, setVarianteActiva] = useState<{ [key: string]: string }>({
    "Tamaño": "150x90cm",
    "Material": "Tela"
  });
  const [isFlying, setIsFlying] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    // Disparar animación
    setIsFlying(true);
    setTimeout(() => setIsFlying(false), 800);

    // Agregar al store
    addItem({
      id: MOCK_PRODUCT.id + "-" + Object.values(varianteActiva).join("-"),
      producto_id: MOCK_PRODUCT.id,
      nombre: MOCK_PRODUCT.nombre,
      precio: MOCK_PRODUCT.precio,
      cantidad,
      variante: Object.values(varianteActiva).join(" / "),
      imagen: MOCK_PRODUCT.imagenes[imgActiva]
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-24 md:pb-8 relative">
      {/* Animación de la flecha / imagen voladora */}
      <AnimatePresence>
        {isFlying && (
          <motion.div
            initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            animate={{ 
              opacity: [1, 1, 0], 
              scale: 0.1, 
              x: window.innerWidth > 768 ? window.innerWidth / 2.5 : window.innerWidth / 2, 
              y: -window.innerHeight / 2 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-[100] w-32 h-32 pointer-events-none drop-shadow-2xl"
            style={{
              top: imageRef.current?.getBoundingClientRect().top || "50%",
              left: imageRef.current?.getBoundingClientRect().left || "50%",
            }}
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden border-2 border-primary">
              {/* Estela cian (simulada con box-shadow) */}
              <div className="absolute inset-0 shadow-[0_0_40px_10px_var(--color-cian)] rounded-xl" />
              <Image
                src={MOCK_PRODUCT.imagenes[imgActiva] || "https://placehold.co/800x800/D2D6D7/022A4F?text=Rusmita"}
                alt="Volando"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        
        {/* Galería */}
        <div className="flex flex-col gap-4">
          <div ref={imageRef} className="relative aspect-square w-full rounded-2xl overflow-hidden bg-secondary border border-border">
            <AnimatePresence mode="wait">
              <motion.div
                key={imgActiva}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={MOCK_PRODUCT.imagenes[imgActiva] || "https://placehold.co/800x800/D2D6D7/022A4F?text=Rusmita"}
                  alt={MOCK_PRODUCT.nombre}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {[0, 1, 2, 3].map((i) => (
              <button 
                key={i}
                onClick={() => setImgActiva(i % 2)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-colors ${imgActiva === (i%2) ? 'border-primary' : 'border-transparent'}`}
              >
                <Image
                  src="https://placehold.co/100x100/D2D6D7/022A4F?text=Thumb"
                  alt={`Thumb ${i}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info del Producto */}
        <div className="flex flex-col">
          <h1 className="font-heading text-2xl md:text-4xl font-bold text-foreground mb-2">
            {MOCK_PRODUCT.nombre}
          </h1>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-accent">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(MOCK_PRODUCT.rating) ? 'fill-accent' : 'text-border'}`} />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({MOCK_PRODUCT.reviews} reseñas)</span>
          </div>

          <div className="flex items-end gap-3 mb-6">
            <span className="font-heading font-bold text-4xl text-primary">
              S/ {MOCK_PRODUCT.precio.toFixed(2)}
            </span>
            {MOCK_PRODUCT.precio_tachado && (
              <span className="text-muted-foreground line-through text-lg mb-1">
                S/ {MOCK_PRODUCT.precio_tachado.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-muted-foreground mb-8">
            {MOCK_PRODUCT.descripcion}
          </p>

          {/* Variantes */}
          {MOCK_PRODUCT.variantes.map((v) => (
            <div key={v.nombre} className="mb-6">
              <h3 className="font-medium text-sm text-foreground mb-3">{v.nombre}</h3>
              <div className="flex flex-wrap gap-2">
                {v.opciones.map(op => {
                  const isActive = varianteActiva[v.nombre] === op;
                  return (
                    <button
                      key={op}
                      onClick={() => setVarianteActiva(prev => ({...prev, [v.nombre]: op}))}
                      className={`relative px-4 py-2 border rounded-lg text-sm transition-colors ${
                        isActive ? "border-primary text-primary" : "border-border text-foreground hover:border-primary/50"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId={`variante-${v.nombre}`}
                          className="absolute inset-0 border-2 border-primary rounded-lg"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      {op}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          {/* Acciones */}
          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            {/* Cantidad */}
            <div className="flex items-center border border-border rounded-lg h-12 w-full sm:w-32 shrink-0">
              <button 
                onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                className="w-10 h-full flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="flex-1 text-center font-medium text-foreground">{cantidad}</span>
              <button 
                onClick={() => setCantidad(cantidad + 1)}
                className="w-10 h-full flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            {/* Botones - Estos se fijarán abajo en móvil en el futuro si se desea */}
            <button 
              onClick={handleAddToCart}
              className="flex-1 h-12 bg-primary text-primary-foreground font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-transform active:scale-95"
            >
              <ShoppingCart className="w-5 h-5" />
              Agregar al carrito
            </button>
            <button className="flex-1 h-12 bg-foreground text-background font-bold rounded-lg flex items-center justify-center hover:bg-foreground/90 transition-transform active:scale-95">
              Comprar ahora
            </button>
          </div>

        </div>
      </div>

      {/* Relacionados */}
      <div className="mt-16 border-t border-border pt-8">
        <h2 className="font-heading text-2xl font-bold text-foreground mb-6">También te podría interesar</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <ProductCard id="3" slug="sombrero-rocoto" nombre="Sombrero Rocoto Relleno" precio={18.00} imagen="" />
          <ProductCard id="4" slug="matraca-arequipa" nombre="Matraca Arequipa" precio={12.00} imagen="" />
        </div>
      </div>
    </div>
  );
}
