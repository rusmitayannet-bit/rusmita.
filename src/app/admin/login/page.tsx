"use client";

import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación de Auth
    if (email === "admin@rusmita.com" && password === "admin123") {
      login(email);
      router.push("/admin");
    } else {
      setError("Credenciales incorrectas. (Pista: admin@rusmita.com / admin123)");
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
      <div className="bg-card w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
        
        {/* Cabecera Azul */}
        <div className="bg-primary p-8 flex flex-col items-center justify-center text-primary-foreground">
          <div className="bg-white p-3 rounded-full shadow-md mb-4">
            <Image src="/logo-rusmita.png" alt="Logo" width={48} height={48} className="object-contain" />
          </div>
          <h1 className="font-heading font-bold text-2xl">Panel de Control</h1>
          <p className="text-primary-foreground/80 text-sm mt-1">Ingresa para administrar la tienda</p>
        </div>

        {/* Formulario */}
        <div className="p-8 space-y-6">
          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-lg text-sm text-center font-medium">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Correo Electrónico</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@rusmita.com" 
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Contraseña</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-md mt-4"
            >
              <Lock className="w-4 h-4" />
              Ingresar al Panel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
