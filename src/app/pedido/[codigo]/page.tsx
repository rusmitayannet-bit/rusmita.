"use client";

import { motion } from "motion/react";
import { CheckCircle2, Navigation, Package, Truck, Home } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PedidoPage() {
  const params = useParams();
  const codigo = params?.codigo as string;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Simulación de estado: 0: Recibido, 1: Preparando, 2: En Camino, 3: Entregado
  const estadoActual = 2; 

  const pasos = [
    { icon: Package, label: "Recibido" },
    { icon: Navigation, label: "Preparando" },
    { icon: Truck, label: "En Camino" },
    { icon: Home, label: "Entregado" }
  ];

  if (!mounted) return null;

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-3xl">
      <div className="text-center mb-12">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="w-20 h-20 bg-[#00A859]/10 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 className="w-10 h-10 text-[#00A859]" />
        </motion.div>
        
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
          ¡Gracias por tu compra!
        </h1>
        <p className="text-muted-foreground text-lg mb-2">
          Tu pedido <span className="font-bold text-foreground">{codigo}</span> ha sido confirmado.
        </p>
        <p className="text-muted-foreground">
          Te enviaremos actualizaciones a tu correo y WhatsApp.
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 md:p-10 mb-8">
        <h2 className="font-heading text-xl font-bold text-foreground mb-12 text-center">Seguimiento de envío</h2>
        
        {/* Tracker animado */}
        <div className="relative max-w-xl mx-auto">
          {/* Línea base */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-secondary -translate-y-1/2 rounded-full" />
          
          {/* Línea de progreso (Cian) */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(estadoActual / (pasos.length - 1)) * 100}%` }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-1/2 left-0 h-1 bg-accent -translate-y-1/2 rounded-full"
          />

          {/* Flecha animada que recorre la línea */}
          <motion.div
            initial={{ left: 0 }}
            animate={{ left: `${(estadoActual / (pasos.length - 1)) * 100}%` }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-1/2 -translate-y-1/2 -ml-3 z-10"
          >
            <Navigation className="w-6 h-6 text-accent fill-accent rotate-90" />
          </motion.div>

          {/* Puntos (Nodos) */}
          <div className="relative flex justify-between">
            {pasos.map((paso, index) => {
              const Icon = paso.icon;
              const completado = index <= estadoActual;
              
              return (
                <div key={paso.label} className="flex flex-col items-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 * index }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-card relative z-0 transition-colors duration-500 ${completado ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                  <span className={`absolute top-12 text-xs font-medium md:text-sm whitespace-nowrap transition-colors duration-500 ${completado ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {paso.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="mt-20 flex justify-between items-center text-sm">
          <div className="text-left">
            <p className="text-muted-foreground">Origen</p>
            <p className="font-medium text-foreground">Arequipa, AQ</p>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground">Destino</p>
            <p className="font-medium text-foreground">Tu domicilio</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link href="/" className="text-primary font-medium hover:underline inline-flex items-center gap-2">
          Volver a la tienda
        </Link>
      </div>
    </div>
  );
}
