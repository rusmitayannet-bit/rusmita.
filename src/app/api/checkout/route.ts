import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Configura Mercado Pago con tu Access Token (esto irá en Vercel)
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN || 'TEST-0000000000000000-000000-00000000000000000000000000000000-000000000' });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, formData, totalFinal } = body;

    // Crear la preferencia de Mercado Pago
    const preference = new Preference(client);
    
    // Mapear los items del carrito al formato que pide Mercado Pago
    const mpItems = items.map((item: any) => ({
      id: item.id,
      title: item.nombre,
      quantity: item.cantidad,
      unit_price: item.precio,
      currency_id: 'PEN', // Moneda peruana
    }));

    // Si hay costo de envío, lo añadimos como un item más
    if (totalFinal > items.reduce((acc: number, i: any) => acc + (i.precio * i.cantidad), 0)) {
      mpItems.push({
        id: 'envio',
        title: 'Costo de Envío',
        quantity: 1,
        unit_price: 10,
        currency_id: 'PEN',
      });
    }

    const response = await preference.create({
      body: {
        items: mpItems,
        payer: {
          name: formData.nombre,
        },
        back_urls: {
          success: `${request.headers.get('origin')}/pedido/PED-${Math.floor(Math.random() * 10000)}?success=true`,
          failure: `${request.headers.get('origin')}/checkout?error=true`,
          pending: `${request.headers.get('origin')}/checkout?pending=true`,
        },
        auto_return: 'approved',
      }
    });

    return NextResponse.json({ 
      id: response.id,
      init_point: response.init_point // Link al checkout de Mercado Pago
    });

  } catch (error) {
    console.error('Error al crear preferencia de Mercado Pago:', error);
    return NextResponse.json({ error: 'Error al procesar el pago' }, { status: 500 });
  }
}
