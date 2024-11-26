'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

export default function Mercado() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<{[key: string]: number}>({});

  useEffect(() => {
    setProducts([
      { id: '1', name: 'Manzanas', price: 2.5, category: 'frutas' },
      { id: '2', name: 'Pan', price: 1.5, category: 'panaderia' },
      { id: '3', name: 'Leche', price: 3, category: 'lacteos' },
    ]);
  }, []);

  const addToCart = (productId: string) => {
    setCart(prevCart => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1
    }));
  };

  const totalItems = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Mercado</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p>Precio: ${product.price.toFixed(2)}</p>
            <button 
              onClick={() => addToCart(product.id)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Añadir al carrito
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Carrito</h2>
        <p>Total de artículos: {totalItems}</p>
        <Link href="/carrito/mercado" className="bg-green-500 text-white px-4 py-2 rounded inline-block mt-2">
          Ver carrito
        </Link>
      </div>
    </div>
  );
}