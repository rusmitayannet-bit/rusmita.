"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

interface ProductCardProps {
  id: string;
  slug: string;
  nombre: string;
  precio: number;
  precio_tachado?: number;
  imagen: string;
  oferta_flash?: boolean;
}

export function ProductCard({ id, slug, nombre, precio, precio_tachado, imagen, oferta_flash }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      whileTap={{ scale: 0.97 }}
      className="group relative flex flex-col bg-card rounded-xl border border-border overflow-hidden transition-shadow"
    >
      {/* Badge Oferta Flash */}
      {oferta_flash && (
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full"
        >
          ¡Oferta Flash!
        </motion.div>
      )}

      {/* Imagen */}
      <Link href={`/producto/${slug}`} className="relative aspect-square w-full overflow-hidden bg-secondary">
        <motion.div className="w-full h-full" whileHover={{ scale: 1.06 }} transition={{ duration: 0.3 }}>
          <Image
            src={imagen || "https://placehold.co/400x400/D2D6D7/022A4F?text=Rusmita"}
            alt={nombre}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </motion.div>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/producto/${slug}`}>
          <h3 className="font-medium text-foreground line-clamp-2 text-sm leading-tight hover:text-primary transition-colors">
            {nombre}
          </h3>
        </Link>
        <div className="mt-auto pt-3 flex items-end gap-2">
          <span className="font-heading font-bold text-xl text-primary">
            S/ {precio.toFixed(2)}
          </span>
          {precio_tachado && (
            <span className="text-muted-foreground line-through text-xs mb-1">
              S/ {precio_tachado.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
