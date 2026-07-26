"use client";

import { Upload, Plus, Save, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

export default function NuevoProductoPage() {
  const [imagenes, setImagenes] = useState<string[]>([]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex justify-between items-center border-b border-border pb-4">
        <h1 className="font-heading text-2xl font-bold text-foreground">Añadir Nuevo Producto</h1>
        <button className="bg-primary text-primary-foreground font-bold px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-sm">
          <Save className="w-4 h-4" />
          Guardar Producto
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Columna Principal: Datos */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border p-6 rounded-xl shadow-sm space-y-4">
            <h2 className="font-heading font-bold text-lg border-b border-border pb-2">Información Básica</h2>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Nombre del Producto</label>
              <input type="text" placeholder="Ej: Bandera del Perú 150x90cm" className="w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:border-primary outline-none" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Descripción detallada</label>
              <textarea rows={4} placeholder="Describe los materiales, usos y características..." className="w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:border-primary outline-none resize-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Precio Regular (S/)</label>
                <input type="number" placeholder="0.00" className="w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:border-primary outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Precio Oferta (Opcional)</label>
                <input type="number" placeholder="0.00" className="w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:border-primary outline-none" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border p-6 rounded-xl shadow-sm space-y-4">
            <h2 className="font-heading font-bold text-lg border-b border-border pb-2">Inventario y Variantes</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">SKU / Código</label>
                <input type="text" placeholder="Ej: BP-15090" className="w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:border-primary outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Stock Inicial</label>
                <input type="number" placeholder="100" className="w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:border-primary outline-none" />
              </div>
            </div>
            
            <button className="text-primary font-medium flex items-center gap-2 mt-4 text-sm hover:underline">
              <Plus className="w-4 h-4" /> Añadir variantes (Talla, Color, Tamaño)
            </button>
          </div>
        </div>

        {/* Columna Lateral: Imágenes y Categoría */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Imágenes */}
          <div className="bg-card border border-border p-6 rounded-xl shadow-sm space-y-4">
            <h2 className="font-heading font-bold text-lg border-b border-border pb-2">Imágenes</h2>
            
            <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors group">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-3 group-hover:bg-primary/20">
                <Upload className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-sm font-medium text-foreground mb-1">Haz clic para subir</p>
              <p className="text-xs text-muted-foreground">PNG, JPG hasta 5MB</p>
            </div>

            {imagenes.length === 0 && (
              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg text-sm text-muted-foreground">
                <ImageIcon className="w-5 h-5 shrink-0" />
                No hay imágenes subidas aún.
              </div>
            )}
          </div>

          {/* Categorización */}
          <div className="bg-card border border-border p-6 rounded-xl shadow-sm space-y-4">
            <h2 className="font-heading font-bold text-lg border-b border-border pb-2">Organización</h2>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Categoría Principal</label>
              <select className="w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:border-primary outline-none">
                <option>Fiestas Patrias</option>
                <option>Navidad</option>
                <option>Oportunidades Únicas</option>
                <option>Hogar y Decoración</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Estado</label>
              <select className="w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:border-primary outline-none">
                <option>Activo (Público)</option>
                <option>Borrador (Oculto)</option>
              </select>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
