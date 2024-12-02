import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ProductCard } from '../components/ProductCard';
import { stores } from '../data/stores';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext'; // Importa el hook del carrito
import { MiniCart } from '../components/MiniCart';
import { Header } from '../components/Header'; // Importa el Header

export function StorePage() {
  const { storeType } = useParams<{ storeType: 'home' | 'pharmacy' | 'services' }>();
  const [storeProducts, setStoreProducts] = useState<Product[]>([]);
  const [store, setStore] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { cart } = useCart(); // Usamos solo el carrito desde el contexto

  useEffect(() => {
    if (storeType) {
      const storeData = stores.find(s => s.id === storeType);
      setStore(storeData);

      // Fetch productos
      fetch(`http://localhost:3001/products/${storeType}`)
        .then((response) => response.json())
        .then((data) => {
          setStoreProducts(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error al cargar productos:', error);
          setLoading(false);
        });
    }
  }, [storeType]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {store && (
        <>
          <Header title={store.name} /> {/* Agrega el Header */}
          <h1 className="text-4xl font-bold text-center mb-8">{store.name}</h1>
          <p className="text-center mb-8">{store.description}</p>
        </>
      )}

      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <p className="text-center">Cargando productos...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storeProducts.length > 0 ? (
              storeProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-center col-span-full">No hay productos disponibles para esta tienda.</p>
            )}
          </div>
        )}
      </main>

      {/* Pasa solo storeType, no cart */}
      <MiniCart storeType={storeType!} />
    </div>
  );
}
