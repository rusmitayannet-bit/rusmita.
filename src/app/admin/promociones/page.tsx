"use client";

import { Upload, Save, Eye, EyeOff, Trash2 } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function PromocionesPage() {
  const [banners, setBanners] = useState([
    { id: 1, nombre: "Banner Principal", tipo: "Hero (1440x400)", estado: "Activo" },
    { id: 2, nombre: "Promoción Fiestas Patrias", tipo: "Cuadrado (400x400)", estado: "Inactivo" }
  ]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex justify-between items-center border-b border-border pb-4">
        <h1 className="font-heading text-2xl font-bold text-foreground">Gestor de Promociones (Banners)</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Columna Lateral: Subir Nuevo */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card border border-border p-6 rounded-xl shadow-sm space-y-4 sticky top-6">
            <h2 className="font-heading font-bold text-lg border-b border-border pb-2">Subir Nueva Promoción</h2>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Nombre interno</label>
              <input type="text" placeholder="Ej: Banner Liquidación" className="w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:border-primary outline-none" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Ubicación</label>
              <select className="w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:border-primary outline-none">
                <option>Banner Principal (Hero - Arriba)</option>
                <option>Oferta Flash (Cinta media)</option>
                <option>Cuadrícula (Pequeño)</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Enlace (Destino al hacer clic)</label>
              <input type="text" placeholder="/categoria/ofertas" className="w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:border-primary outline-none" />
            </div>

            <div className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors group mt-4">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center mb-2 group-hover:bg-primary/20">
                <Upload className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-sm font-medium text-foreground">Subir Imagen</p>
              <p className="text-xs text-muted-foreground mt-1">Recomendado: 1440x400px para Hero</p>
            </div>

            <button className="w-full bg-primary text-primary-foreground font-bold px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-sm mt-4">
              <Save className="w-4 h-4" />
              Guardar y Publicar
            </button>
          </div>
        </div>

        {/* Columna Principal: Banners Activos */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border bg-secondary/30">
              <h2 className="font-heading font-bold text-lg text-foreground">Promociones Actuales</h2>
            </div>
            
            <div className="divide-y divide-border">
              {banners.map((b) => (
                <div key={b.id} className="p-6 flex flex-col sm:flex-row gap-6 items-center">
                  
                  {/* Vista Previa */}
                  <div className="w-full sm:w-48 h-24 bg-secondary rounded-lg border border-border flex items-center justify-center relative overflow-hidden shrink-0">
                    <span className="text-xs text-muted-foreground font-medium">Vista Previa</span>
                  </div>

                  {/* Datos */}
                  <div className="flex-1 w-full space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-foreground">{b.nombre}</h3>
                      <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${b.estado === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {b.estado}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Tipo: {b.tipo}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">Destino: /ofertas</p>
                    
                    <div className="flex items-center gap-3 pt-3">
                      <button className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                        {b.estado === 'Activo' ? <><EyeOff className="w-4 h-4"/> Ocultar</> : <><Eye className="w-4 h-4"/> Activar</>}
                      </button>
                      <button className="text-sm font-medium text-destructive hover:underline flex items-center gap-1">
                        <Trash2 className="w-4 h-4"/> Eliminar
                      </button>
                    </div>
                  </div>
                  
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
