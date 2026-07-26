-- Habilitar extensión pgcrypto para UUIDs si no está habilitada
create extension if not exists "pgcrypto";

-- Tabla: categorias
create table categorias (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  slug text unique not null,
  icono text,
  orden int default 0,
  activo boolean default true
);

-- Tabla: productos
create table productos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  slug text unique not null,
  descripcion text,
  precio numeric(10,2) not null,
  precio_tachado numeric(10,2),
  costo numeric(10,2),
  stock int default 0,
  categoria_id uuid references categorias(id),
  imagenes text[] default '{}',
  destacado boolean default false,
  oferta_flash boolean default false,
  oferta_termina timestamptz,
  vendidos int default 0,
  rating numeric(2,1) default 5.0,
  activo boolean default true,
  created_at timestamptz default now()
);

-- Tabla: variantes
create table variantes (
  id uuid primary key default gen_random_uuid(),
  producto_id uuid references productos(id) on delete cascade,
  nombre text not null,        -- "Color", "Talla"
  valor text not null,         -- "Rojo", "M"
  stock int default 0,
  precio_extra numeric(10,2) default 0
);

-- Tabla: perfiles (se asume que la tabla auth.users existe)
create table perfiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nombre text,
  telefono text,
  rol text default 'cliente'   -- 'cliente' | 'admin'
);

-- Tabla: pedidos
create table pedidos (
  id uuid primary key default gen_random_uuid(),
  codigo text unique not null,
  user_id uuid references auth.users(id),
  cliente_nombre text not null,
  cliente_telefono text not null,
  cliente_email text,
  direccion text not null,
  distrito text,
  ciudad text default 'Arequipa',
  metodo_envio text,
  costo_envio numeric(10,2) default 0,
  subtotal numeric(10,2) not null,
  descuento numeric(10,2) default 0,
  total numeric(10,2) not null,
  metodo_pago text,
  estado text default 'pendiente',
  pago_id text,
  created_at timestamptz default now()
);

-- Tabla: pedido_items
create table pedido_items (
  id uuid primary key default gen_random_uuid(),
  pedido_id uuid references pedidos(id) on delete cascade,
  producto_id uuid references productos(id),
  nombre_producto text not null,
  variante text,
  cantidad int not null,
  precio_unitario numeric(10,2) not null
);

-- Tabla: cupones
create table cupones (
  id uuid primary key default gen_random_uuid(),
  codigo text unique not null,
  tipo text not null,          -- 'porcentaje' | 'monto'
  valor numeric(10,2) not null,
  minimo_compra numeric(10,2) default 0,
  usos_max int,
  usos_actuales int default 0,
  vence timestamptz,
  activo boolean default true
);

----------------------------------------------------
-- Row Level Security (RLS)
----------------------------------------------------

alter table categorias enable row level security;
alter table productos enable row level security;
alter table variantes enable row level security;
alter table perfiles enable row level security;
alter table pedidos enable row level security;
alter table pedido_items enable row level security;
alter table cupones enable row level security;

-- Función de conveniencia para verificar si es admin
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.perfiles
    where id = auth.uid() and rol = 'admin'
  );
$$ language sql security definer;

-- LECTURA PÚBLICA DE CATÁLOGO (clientes y anónimos)
create policy "Lectura pública de categorias" 
  on categorias for select using (activo = true);
create policy "Lectura pública de productos" 
  on productos for select using (activo = true);
create policy "Lectura pública de variantes" 
  on variantes for select using (
    exists (select 1 from productos p where p.id = variantes.producto_id and p.activo = true)
  );

-- ADMIN: Acceso total al catálogo
create policy "Admin total categorias" 
  on categorias for all using (public.is_admin());
create policy "Admin total productos" 
  on productos for all using (public.is_admin());
create policy "Admin total variantes" 
  on variantes for all using (public.is_admin());
create policy "Admin total cupones" 
  on cupones for all using (public.is_admin());

-- PERFILES
create policy "Perfil de lectura propia" 
  on perfiles for select using (id = auth.uid());
create policy "Perfil de escritura propia" 
  on perfiles for update using (id = auth.uid());
create policy "Admin lee todos los perfiles"
  on perfiles for select using (public.is_admin());

-- PEDIDOS
create policy "Cliente lee sus propios pedidos"
  on pedidos for select using (user_id = auth.uid());
create policy "Admin lee y actualiza todos los pedidos"
  on pedidos for all using (public.is_admin());
-- (La creación de pedidos se hará vía API/Server con rol de servicio, así evitamos crear política pública que permita insert)

-- PEDIDO ITEMS
create policy "Cliente lee sus propios items"
  on pedido_items for select using (
    exists (select 1 from pedidos p where p.id = pedido_items.pedido_id and p.user_id = auth.uid())
  );
create policy "Admin lee y actualiza todos los items"
  on pedido_items for all using (public.is_admin());

----------------------------------------------------
-- Storage: Bucket para productos
----------------------------------------------------

insert into storage.buckets (id, name, public) 
values ('productos', 'productos', true)
on conflict do nothing;

create policy "Lectura publica bucket productos"
  on storage.objects for select 
  using (bucket_id = 'productos');

create policy "Admin insert bucket productos"
  on storage.objects for insert 
  with check (bucket_id = 'productos' and public.is_admin());

create policy "Admin update/delete bucket productos"
  on storage.objects for all 
  using (bucket_id = 'productos' and public.is_admin());
