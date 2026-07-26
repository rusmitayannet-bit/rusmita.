"use client";

import { useCartStore } from "@/store/cart";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { CreditCard, Truck, Check, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [paso, setPaso] = useState(1);
  const [procesando, setProcesando] = useState(false);
  
  const [formData, setFormData] = useState({
    nombre: "", telefono: "", direccion: "", distrito: "Cercado",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const total = getTotal();
  const envio = total > 99 ? 0 : 10;
  const totalFinal = total + envio;

  const handlePagarWhatsApp = () => {
    setProcesando(true);
    // Simular creación del pedido en BD
    setTimeout(() => {
      const codigo = "PED-" + Math.floor(Math.random() * 10000);
      const texto = `Hola Rusmita, quiero confirmar mi pedido ${codigo}. Total: S/${totalFinal.toFixed(2)}`;
      window.open(`https://wa.me/51987654321?text=${encodeURIComponent(texto)}`, "_blank");
      clearCart();
      router.push(`/pedido/${codigo}`);
    }, 1500);
  };

  const handlePagarTarjeta = () => {
    setProcesando(true);
    // Aquí iría la integración con Culqi
    setTimeout(() => {
      const codigo = "PED-" + Math.floor(Math.random() * 10000);
      clearCart();
      router.push(`/pedido/${codigo}?success=true`);
    }, 2000);
  };

  if (!mounted) return null;
  
  if (items.length === 0 && !procesando) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-2xl font-bold mb-4 text-foreground">Tu carrito está vacío</h1>
        <button onClick={() => router.push("/")} className="bg-primary text-primary-foreground font-bold px-6 py-2 rounded-full hover:bg-primary/90">
          Volver a la tienda
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
      <h1 className="font-heading text-3xl font-bold mb-8 text-foreground">Finalizar Compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Formulario */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Barra de progreso */}
          <div className="flex items-center gap-2 mb-8">
            <div className={`flex-1 h-2 rounded-full ${paso >= 1 ? 'bg-accent' : 'bg-secondary'}`} />
            <div className={`flex-1 h-2 rounded-full ${paso >= 2 ? 'bg-accent' : 'bg-secondary'}`} />
            <div className={`flex-1 h-2 rounded-full ${paso >= 3 ? 'bg-accent' : 'bg-secondary'}`} />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border p-6 rounded-xl"
          >
            <h2 className="font-heading text-xl font-bold mb-4 flex items-center gap-2 text-foreground">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">1</span>
              Tus Datos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Nombre completo" className="w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:border-primary outline-none text-foreground" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} />
              <input type="tel" placeholder="Celular" className="w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:border-primary outline-none text-foreground" value={formData.telefono} onChange={e => setFormData({...formData, telefono: e.target.value})} />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-card border border-border p-6 rounded-xl"
          >
            <h2 className="font-heading text-xl font-bold mb-4 flex items-center gap-2 text-foreground">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">2</span>
              Envío
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <select className="w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:border-primary outline-none text-foreground" value={formData.distrito} onChange={e => setFormData({...formData, distrito: e.target.value})}>
                <option>Cercado</option>
                <option>Cayma</option>
                <option>Yanahuara</option>
                <option>Cerro Colorado</option>
                <option>JLBYR</option>
              </select>
              <input type="text" placeholder="Dirección exacta" className="w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:border-primary outline-none text-foreground" value={formData.direccion} onChange={e => setFormData({...formData, direccion: e.target.value})} />
            </div>
            
            <div className="p-4 border border-accent bg-accent/10 rounded-lg flex gap-4 items-center">
              <Truck className="text-accent w-6 h-6" />
              <div>
                <p className="font-medium text-foreground">Envío a domicilio ({formData.distrito})</p>
                <p className="text-sm text-muted-foreground">{envio === 0 ? "¡Envío Gratis!" : `S/ ${envio.toFixed(2)}`}</p>
              </div>
              <Check className="ml-auto text-accent w-5 h-5" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-card border border-border p-6 rounded-xl"
          >
            <h2 className="font-heading text-xl font-bold mb-4 flex items-center gap-2 text-foreground">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">3</span>
              Pago
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button onClick={handlePagarTarjeta} disabled={procesando} className="flex flex-col items-center justify-center gap-2 p-4 border border-border rounded-lg hover:border-primary transition-colors disabled:opacity-50">
                <CreditCard className="w-8 h-8 text-foreground" />
                <span className="font-medium text-foreground">Tarjeta (Culqi)</span>
              </button>
              <button onClick={handlePagarWhatsApp} disabled={procesando} className="flex flex-col items-center justify-center gap-2 p-4 border border-border rounded-lg hover:border-primary transition-colors disabled:opacity-50 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[#00A859]/10 translate-y-full group-hover:translate-y-0 transition-transform" />
                <Smartphone className="w-8 h-8 text-[#00A859] z-10" />
                <span className="font-medium text-foreground z-10">Yape / Plin</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Resumen */}
        <div className="lg:col-span-1">
          <div className="bg-secondary/50 border border-border p-6 rounded-xl sticky top-24">
            <h3 className="font-heading font-bold text-xl mb-4 text-foreground">Resumen de tu pedido</h3>
            
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
              {items.map(item => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative w-16 h-16 bg-background rounded border border-border overflow-hidden shrink-0">
                    <Image src={item.imagen || "https://placehold.co/100"} alt={item.nombre} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium line-clamp-2 text-foreground">{item.nombre}</p>
                    <p className="text-xs text-muted-foreground">{item.cantidad} x S/ {item.precio.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-2 mb-4">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>S/ {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Envío</span>
                <span>{envio === 0 ? "Gratis" : `S/ ${envio.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-heading font-bold text-2xl text-foreground mt-2 pt-2 border-t border-border">
                <span>Total</span>
                <span className="text-primary">S/ {totalFinal.toFixed(2)}</span>
              </div>
            </div>

            {procesando && (
              <div className="flex items-center justify-center gap-2 text-primary font-medium">
                <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                Procesando pedido...
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
