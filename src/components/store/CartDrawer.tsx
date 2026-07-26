"use client";

import { useCartStore } from "@/store/cart";
import { motion, AnimatePresence } from "motion/react";
import { X, Minus, Plus, Trash2, ArrowRight, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CartDrawer() {
  const { isOpen, setIsOpen, items, updateQuantity, removeItem, getTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-background border-l border-border z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="font-heading font-bold text-xl text-foreground">Tu Carrito</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-secondary text-muted-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="flex flex-col items-center justify-center h-full text-center space-y-4"
                  >
                    <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-4">
                      <ShoppingCart className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <p className="text-foreground font-medium">Tu carrito está vacío.</p>
                    <p className="text-muted-foreground text-sm">Mira las ofertas de esta semana.</p>
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="mt-4 px-6 py-2 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-transform active:scale-95"
                    >
                      Ver Ofertas
                    </button>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.8, x: 50, height: 0, marginBottom: 0 }}
                      className="flex gap-4 bg-card border border-border p-3 rounded-xl"
                    >
                      <div className="relative w-20 h-20 bg-secondary rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={item.imagen || "https://placehold.co/200x200/D2D6D7/022A4F?text=Rusmita"}
                          alt={item.nombre}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-sm font-medium text-foreground line-clamp-2 leading-tight">
                            {item.nombre}
                          </h4>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        {item.variante && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.variante}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-auto pt-2">
                          <div className="flex items-center border border-border rounded-md h-8 bg-background">
                            <button 
                              onClick={() => updateQuantity(item.id, Math.max(1, item.cantidad - 1))}
                              className="w-8 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{item.cantidad}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                              className="w-8 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-heading font-bold text-primary">
                            S/ {(item.precio * item.cantidad).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {items.length > 0 && (
              <div className="p-4 border-t border-border bg-card">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Subtotal</span>
                    <span>S/ {getTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-heading font-bold text-xl text-foreground">
                    <span>Total</span>
                    <motion.span 
                      key={getTotal()} 
                      initial={{ scale: 1.2, color: "var(--color-primary)" }}
                      animate={{ scale: 1, color: "var(--color-foreground)" }}
                      className="text-primary"
                    >
                      S/ {getTotal().toFixed(2)}
                    </motion.span>
                  </div>
                </div>
                <Link 
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-4 rounded-xl hover:bg-primary/90 transition-transform active:scale-95"
                >
                  Continuar con el pago
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
