'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
}

export default function Admin() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    price: 0,
    category: '',
    inventory: 0,
  });

  useEffect(() => {
    if (status === 'loading') return;
    if (!session || session.user.role !== 'admin') {
      router.push('/');
    } else {
      fetchProducts();
    }
  }, [session, status, router]);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });
    if (res.ok) {
      fetchProducts();
      setNewProduct({
        name: '',
        description: '',
        price: 0,
        category: '',
        inventory: 0,
      });
    }
  };

  if (status === 'loading') {
    return <div>Cargando...</div>;
  }

  if (!session || session.user.role !== 'admin') {
    return null;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Administración de Productos</h1>
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          placeholder="Nombre del producto"
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="text"
          name="description"
          value={newProduct.description}
          onChange={handleInputChange}
          placeholder="Descripción"
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
          placeholder="Precio"
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="text"
          name="category"
          value={newProduct.category}
          onChange={handleInputChange}
          placeholder="Categoría"
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="number"
          name="inventory"
          value={newProduct.inventory}
          onChange={handleInputChange}
          placeholder="Inventario"
          className="w-full px-3 py-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Añadir Producto
        </button>
      </form>
      <h2 className="text-xl font-bold mb-2">Productos Existentes</h2>
      <ul className="space-y-2">
        {products.map(product => (
          <li key={product.id} className="border p-2 rounded">
            {product.name} - ${product.price} - Inventario: {product.inventory}
          </li>
        ))}
      </ul>
    </div>
  );
}

