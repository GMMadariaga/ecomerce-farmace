'use client';

import { useState, useEffect } from 'react';
import WhatsAppButton from '@/app/components/WhatsAppButton';

// ... (resto del código del carrito)

export default function CarritoMercado() {
  // ... (estado y lógica del carrito)

  return (
    <div>
      {/* ... (renderizado de los items del carrito) */}
      {/* <WhatsAppButton message={`Quiero hacer un pedido de: ${itemsString}`} /> */}
      <WhatsAppButton message={`Quiero hacer un pedido de:... `} />
    </div>
  );
}

