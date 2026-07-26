# Tienda Online Importadora Rusmita

¡Bienvenido al código fuente de la nueva tienda online de **Importadora Rusmita**! 
Esta aplicación ha sido construida con Next.js 15 (App Router), Tailwind CSS v4, shadcn/ui, Framer Motion y Zustand, preparada para conectarse con Supabase y Culqi.

## Características Principales

*   **Mobile-First**: Diseñada pensando en el 90% de tráfico que viene de TikTok. Cuenta con barra de navegación inferior en dispositivos móviles.
*   **Identidad de Marca**: Colores fucsia y cian vibrantes que reflejan la energía de Rusmita.
*   **Animación de Firma**: Al agregar un producto al carrito, este "vuela" dejando una estela cian hasta el ícono del carrito.
*   **Panel de Administración**: Interfaz sobria y rápida para la gestión de productos, categorías y pedidos (ubicado en `/admin`).
*   **Rendimiento**: Animaciones optimizadas que respetan `prefers-reduced-motion`.

## Pasos para Desplegar (Deploy) en Vercel

Sigue estos pasos para que la tienda de Rusmita esté disponible en internet de manera gratuita y rápida.

### 1. Preparar la Base de Datos (Supabase)
1. Ve a [Supabase](https://supabase.com) y crea un nuevo proyecto.
2. En el panel lateral, ve a **SQL Editor** y ejecuta, uno por uno, los archivos que se encuentran en la carpeta `supabase/migrations/00001_init.sql` y `supabase/seed.sql` de este proyecto.
3. Ve a **Project Settings -> API** y copia tu `Project URL` y `anon public key`.

### 2. Subir el código a GitHub
1. Entra a [GitHub](https://github.com) y crea un nuevo repositorio llamado `rusmita-store` (mantenlo público o privado, según prefieras).
2. En tu computadora (dentro de la carpeta del proyecto `D:\rusmita`), abre la terminal y ejecuta:
   ```bash
   git add .
   git commit -m "Versión inicial Rusmita Store"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/rusmita-store.git
   git push -u origin main
   ```

### 3. Publicar en Vercel
1. Ve a [Vercel](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **Add New -> Project**.
3. Vercel detectará automáticamente tu repositorio `rusmita-store`. Haz clic en **Import**.
4. En la sección **Environment Variables**, debes agregar las claves que obtuviste en Supabase:
   *   Name: `NEXT_PUBLIC_SUPABASE_URL` | Value: *(tu project URL de supabase)*
   *   Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Value: *(tu anon key de supabase)*
   *   *(Agrega también las de Culqi cuando pases a producción)*
5. Haz clic en **Deploy**.

¡Y listo! Vercel construirá tu tienda y en menos de dos minutos te entregará un enlace en vivo (ej. `rusmita-store.vercel.app`).

## Desarrollo Local

Si deseas probar la tienda en tu computadora antes de subirla:

1. Renombra el archivo `.env.example` a `.env.local` y coloca ahí tus credenciales de Supabase.
2. Abre la terminal en `D:\rusmita` y ejecuta:
   ```bash
   npm install
   npm run dev
   ```
3. Visita [http://localhost:3000](http://localhost:3000) en tu navegador.

¡Donde tú sí importas!
