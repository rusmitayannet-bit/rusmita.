"use client";

import { Package, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-foreground">Resumen del Día</h1>
      
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-muted-foreground text-sm font-medium">Ventas Hoy</h3>
            <span className="p-2 bg-primary/10 text-primary rounded-lg"><TrendingUp className="w-4 h-4" /></span>
          </div>
          <p className="font-heading text-3xl font-bold text-foreground">S/ 1,245.50</p>
          <p className="text-xs text-green-600 mt-2 flex items-center gap-1">+12% vs ayer</p>
        </div>

        <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-muted-foreground text-sm font-medium">Nuevos Pedidos</h3>
            <span className="p-2 bg-accent/10 text-accent rounded-lg"><Package className="w-4 h-4" /></span>
          </div>
          <p className="font-heading text-3xl font-bold text-foreground">18</p>
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">5 pendientes de envío</p>
        </div>

        <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-muted-foreground text-sm font-medium">Alertas de Stock</h3>
            <span className="p-2 bg-destructive/10 text-destructive rounded-lg"><AlertTriangle className="w-4 h-4" /></span>
          </div>
          <p className="font-heading text-3xl font-bold text-foreground">3</p>
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">Productos por agotarse</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Últimos Pedidos */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h2 className="font-heading font-bold text-lg text-foreground">Últimos Pedidos</h2>
            <button className="text-sm text-primary hover:underline font-medium">Ver todos</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-muted-foreground">
              <thead className="text-xs text-foreground bg-secondary/50 uppercase">
                <tr>
                  <th className="px-6 py-3 font-medium">ID Pedido</th>
                  <th className="px-6 py-3 font-medium">Cliente</th>
                  <th className="px-6 py-3 font-medium">Monto</th>
                  <th className="px-6 py-3 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border hover:bg-secondary/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">PED-4521</td>
                  <td className="px-6 py-4">María Gonzales</td>
                  <td className="px-6 py-4">S/ 120.00</td>
                  <td className="px-6 py-4">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Pendiente</span>
                  </td>
                </tr>
                <tr className="border-b border-border hover:bg-secondary/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">PED-4520</td>
                  <td className="px-6 py-4">Juan Pérez</td>
                  <td className="px-6 py-4">S/ 45.50</td>
                  <td className="px-6 py-4">
                    <span className="bg-accent/20 text-accent px-2 py-1 rounded-full text-xs font-medium">Enviado</span>
                  </td>
                </tr>
                <tr className="hover:bg-secondary/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">PED-4519</td>
                  <td className="px-6 py-4">Ana López</td>
                  <td className="px-6 py-4">S/ 210.00</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Entregado</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Productos Más Vendidos */}
        <div className="bg-card border border-border rounded-xl shadow-sm">
          <div className="p-6 border-b border-border">
            <h2 className="font-heading font-bold text-lg text-foreground">Top Ventas (Semana)</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary rounded flex items-center justify-center shrink-0">1</div>
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm line-clamp-1">Bandera del Perú Grande</p>
                <p className="text-xs text-muted-foreground">42 unidades</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary rounded flex items-center justify-center shrink-0">2</div>
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm line-clamp-1">Escarapelas (Paquete 100)</p>
                <p className="text-xs text-muted-foreground">35 paquetes</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary rounded flex items-center justify-center shrink-0">3</div>
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm line-clamp-1">Sombrero Rocoto Relleno</p>
                <p className="text-xs text-muted-foreground">28 unidades</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
