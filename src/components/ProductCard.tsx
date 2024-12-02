import { Product } from '../types';
import { Button } from './ui/Button';
import { useCart } from '../contexts/CartContext'; // Importa el hook del contexto

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart(); // Usamos el hook para obtener la función addToCart

  // Imprime la ruta de la imagen en la consola
  console.log(`Ruta de la imagen: /images/${product.image}`);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={`/images/${product.image}.${product.imageType}`} // Asegúrate de que la ruta de la imagen sea correcta
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{product.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <span className="text-sm text-gray-500">{product.stock} in stock</span>
        </div>
        <Button
          className="w-full mt-4"
          onClick={() => addToCart(product)} // Llamamos a addToCart del contexto
          disabled={product.stock === 0}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
