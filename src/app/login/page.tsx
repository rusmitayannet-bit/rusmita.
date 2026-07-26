"use client";

import { createClient } from "@/lib/supabase";
import { LogIn } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  const handleGoogleLogin = async () => {
    setLoading(true);
    setMensaje({ tipo: "", texto: "" });
    const supabase = createClient();
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMensaje({ tipo: "error", texto: error.message });
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensaje({ tipo: "", texto: "" });
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMensaje({ tipo: "error", texto: "Credenciales incorrectas. Si no tienes cuenta, haz clic en Registrarse." });
      setLoading(false);
    } else {
      window.location.href = "/";
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      setMensaje({ tipo: "error", texto: "Ingresa un correo y contraseña" });
      return;
    }
    setLoading(true);
    setMensaje({ tipo: "", texto: "" });
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      }
    });

    if (error) {
      setMensaje({ tipo: "error", texto: error.message });
    } else {
      setMensaje({ tipo: "exito", texto: "¡Cuenta creada! Revisa tu correo para verificar." });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full bg-card border border-border rounded-2xl shadow-xl p-8 text-center">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
          ¡Bienvenido a Rusmita!
        </h1>
        <p className="text-muted-foreground mb-6">
          Inicia sesión para guardar tus pedidos, ver ofertas exclusivas y comprar más rápido.
        </p>

        {mensaje.texto && (
          <div className={`p-3 mb-6 rounded-lg text-sm ${mensaje.tipo === 'error' ? 'bg-destructive/10 text-destructive' : 'bg-[#84C32E]/10 text-[#84C32E]'}`}>
            {mensaje.texto}
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-secondary border border-border rounded-lg px-4 py-3 focus:border-primary outline-none text-foreground"
            required
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-secondary border border-border rounded-lg px-4 py-3 focus:border-primary outline-none text-foreground"
            required
          />
          
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={handleSignUp}
              disabled={loading}
              className="flex-1 bg-secondary text-foreground font-bold py-3 rounded-xl hover:bg-secondary/80 transition-colors disabled:opacity-50"
            >
              Registrarse
            </button>
          </div>
        </form>

        <div className="relative flex items-center gap-4 py-4 mb-2">
          <div className="flex-1 h-px bg-border"></div>
          <span className="text-sm text-muted-foreground">o</span>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white text-black border border-gray-300 font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 rounded-full border-2 border-black border-t-transparent animate-spin" />
          ) : (
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          )}
          Continuar con Google
        </button>
      </div>
    </div>
  );
}
