"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, Package, ShoppingBag, Tags, Users, Settings, LogOut } from "lucide-react";
import Image from "next/image";
import { useAuthStore } from "@/store/auth";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated && !pathname.startsWith("/admin/login")) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, pathname, router]);

  if (!mounted) return null;

  // Si estamos en la página de login, no mostramos el layout (sidebar)
  if (pathname.startsWith("/admin/login")) {
    return <>{children}</>;
  }

  if (!isAuthenticated) return null;

  const menu = [
    { name: "Dashboard", href: "/admin", icon: BarChart3 },
    { name: "Pedidos", href: "/admin/pedidos", icon: ShoppingBag },
    { name: "Productos", href: "/admin/productos", icon: Package },
    { name: "Nuevo Producto", href: "/admin/productos/nuevo", icon: Package },
    { name: "Promociones", href: "/admin/promociones", icon: Tags },
    { name: "Categorías", href: "/admin/categorias", icon: Tags },
    { name: "Clientes", href: "/admin/clientes", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-secondary flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col fixed inset-y-0 z-10">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Image src="/logo-rusmita.png" alt="Rusmita Admin" width={32} height={32} className="mr-2" />
          <span className="font-heading font-bold text-lg text-primary">Admin Panel</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {menu.map(item => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border space-y-1">
          <Link href="/admin/configuracion" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <Settings className="w-5 h-5" />
            Configuración
          </Link>
          <button 
            onClick={() => { logout(); router.push("/admin/login"); }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
