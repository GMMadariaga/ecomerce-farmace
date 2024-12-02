import { useState } from 'react';
import { ShoppingCart, ChevronUp, ChevronDown } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Cart } from './Cart';

interface MiniCartProps {
  storeType: 'home' | 'pharmacy' | 'services';
}

export function MiniCart({ storeType }: MiniCartProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity ?? 0), 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * (item.quantity ?? 0)), 0);

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t">
      <div className="container mx-auto p-4">
        <div className="relative">
          {isExpanded && (
            <div className="absolute bottom-full mb-2 right-0 w-full max-w-md bg-white rounded-t-lg shadow-lg border">
              <Cart storeType={storeType} />
            </div>
          )}

          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
              <span className="font-medium">{totalItems} artículos</span>
              <span className="text-gray-600">|</span>
              <span className="font-medium">${totalPrice.toFixed(2)}</span>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              {isExpanded ? (
                <ChevronDown className="w-5 h-5" />
              ) : (
                <ChevronUp className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
