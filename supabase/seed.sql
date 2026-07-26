-- Insertar Categorías
INSERT INTO categorias (id, nombre, slug, icono, orden) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Fiestas Patrias', 'fiestas-patrias', 'flag', 1),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Fiestas de Arequipa', 'fiestas-arequipa', 'mountain', 2),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Navidad', 'navidad', 'tree', 3),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'Feria Escolar', 'feria-escolar', 'backpack', 4);

-- Insertar Productos
INSERT INTO productos (id, nombre, slug, descripcion, precio, precio_tachado, costo, stock, categoria_id, destacado, oferta_flash) VALUES
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b11', 'Bandera del Perú Grande', 'bandera-peru-grande', 'Bandera oficial de tela con escudo, tamaño 150x90cm.', 25.00, 35.00, 15.00, 50, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', true, false),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b12', 'Escarapelas (Paquete de 100)', 'escarapelas-paquete', 'Escarapelas de metal para solapa.', 15.00, 20.00, 8.00, 100, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', false, true),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b13', 'Sombrero Rocoto Relleno', 'sombrero-rocoto', 'Sombrero de tela con forma de rocoto relleno, ideal para corso.', 18.00, 25.00, 10.00, 30, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', true, true),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b14', 'Matraca Arequipa', 'matraca-arequipa', 'Matraca de madera con colores de Arequipa.', 12.00, null, 6.00, 60, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', false, false),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b15', 'Árbol de Navidad 1.5m', 'arbol-navidad-1-5m', 'Árbol verde frondoso, fácil de armar.', 85.00, 120.00, 50.00, 20, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', true, false),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b16', 'Luces LED Navideñas 100 focos', 'luces-led-navidenas', 'Luces cálidas de 10 metros, cable verde.', 15.00, 22.00, 8.00, 200, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', false, true),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b17', 'Bolas Navideñas (Pack 24)', 'bolas-navidenas-pack-24', 'Bolas de plástico brillante y mate.', 18.00, 25.00, 9.00, 150, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', false, false),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b18', 'Gorro Papá Noel', 'gorro-papa-noel', 'Gorro clásico rojo con blanco de tela polar.', 5.00, 8.00, 2.50, 300, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', true, false),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b19', 'Cuaderno A4 Cuadriculado', 'cuaderno-a4-cuadriculado', 'Cuaderno grapado de 100 hojas.', 4.50, 6.00, 2.80, 500, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', false, false),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b20', 'Lápices 2B (Caja x 12)', 'lapices-2b-caja-12', 'Lápices de grafito de alta calidad.', 8.00, 10.00, 4.00, 100, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', false, true),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b21', 'Colores (Caja x 24)', 'colores-caja-24', 'Lápices de colores variados, madera resistente.', 14.00, 18.00, 8.00, 120, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', true, false),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 'Mochila Escolar Básica', 'mochila-escolar-basica', 'Mochila resistente al agua, un compartimento principal.', 35.00, 45.00, 20.00, 50, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', false, false),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b23', 'Globos de Agua (Pack 100)', 'globos-agua-pack-100', 'Para carnavales, colores surtidos.', 5.00, 7.00, 2.00, 300, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', true, false),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b24', 'Espuma Carnavalera', 'espuma-carnavalera', 'Spray de espuma no tóxica, 400ml.', 8.00, 12.00, 4.00, 200, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', false, true),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b25', 'Pistola de Agua Grande', 'pistola-agua-grande', 'Pistola de agua con tanque de 1 litro.', 25.00, 35.00, 12.00, 40, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', true, false),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b26', 'Sombrero de Paja Arequipeño', 'sombrero-paja', 'Tradicional sombrero para protegerse del sol arequipeño.', 20.00, 25.00, 10.00, 50, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', false, false),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b27', 'Banderola "Feliz Navidad"', 'banderola-feliz-navidad', 'Letras doradas de cartón metalizado.', 10.00, 15.00, 5.00, 100, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', false, false),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b28', 'Nacimiento de Resina', 'nacimiento-resina', 'Juego de 12 piezas de resina pintadas a mano.', 45.00, 60.00, 25.00, 30, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', true, false),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b29', 'Estrella Luminosa', 'estrella-luminosa', 'Estrella para la punta del árbol con luz LED.', 12.00, 18.00, 6.00, 80, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', false, true),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b30', 'Pizarra Blanca Pequeña', 'pizarra-blanca', 'Pizarra acrílica 30x40cm con plumón.', 15.00, 20.00, 8.00, 60, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', false, false);
