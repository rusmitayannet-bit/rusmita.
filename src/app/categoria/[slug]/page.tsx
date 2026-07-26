"use client";

import { ProductCard } from "@/components/store/ProductCard";
import { motion } from "motion/react";
import { useParams } from "next/navigation";

// Mocks
const MOCK_PRODUCTS = [
  { id: "1", slug: "bandera-peru-grande", nombre: "Bandera del Perú Grande", precio: 25.00, precio_tachado: 35.00, imagen: "", oferta_flash: false },
  { id: "2", slug: "escarapelas-paquete", nombre: "Escarapelas (Paquete de 100)", precio: 15.00, precio_tachado: 20.00, imagen: "", oferta_flash: true },
  { id: "3", slug: "sombrero-rocoto", nombre: "Sombrero Rocoto Relleno", precio: 18.00, precio_tachado: 25.00, imagen: "", oferta_flash: true },
  { id: "4", slug: "matraca-arequipa", nombre: "Matraca Arequipa", precio: 12.00, imagen: "", oferta_flash: false },
];

export default function CategoriaPage() {
  const params = useParams();
  const slug = params?.slug as string || "";
  
  const titulo = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Filtros Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-card border border-border rounded-xl p-4 sticky top-20">
            <h3 className="font-heading font-bold text-lg mb-4 text-foreground">Filtros</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Precio</h4>
                <div className="flex gap-2">
                  <input type="number" placeholder="Min" className="w-full bg-secondary border border-border rounded-md px-2 py-1 text-sm focus:border-primary outline-none" />
                  <input type="number" placeholder="Max" className="w-full bg-secondary border border-border rounded-md px-2 py-1 text-sm focus:border-primary outline-none" />
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Mostrar</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-foreground">
                    <input type="checkbox" className="rounded text-primary focus:ring-primary accent-primary" />
                    Ofertas Flash
                  </label>
                  <label className="flex items-center gap-2 text-sm text-foreground">
                    <input type="checkbox" className="rounded text-primary focus:ring-primary accent-primary" />
                    Más vendidos
                  </label>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Listado */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              {titulo || "Categoría"}
            </h1>
            
            <select className="bg-secondary border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-foreground">
              <option>Ordenar por: Destacados</option>
              <option>Precio: Menor a Mayor</option>
              <option>Precio: Mayor a Menor</option>
              <option>Novedades</option>
            </select>
          </div>

          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            variants={{ show: { transition: { staggerChildren: 0.06 } } }}
            initial="hidden"
            animate="show"
          >
            {MOCK_PRODUCTS.map(producto => (
              <ProductCard key={producto.id} {...producto} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
