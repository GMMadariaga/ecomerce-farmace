import { useCart } from '../contexts/CartContext';
import { Button } from './ui/Button';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartProps {
  storeType: 'home' | 'pharmacy' | 'services';
}

export function Cart({ storeType }: CartProps) {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity ?? 0)), 0);

  const handleWhatsAppCheckout = () => {
    const storeNames = {
      home: 'Tienda del Hogar',
      pharmacy: 'Farmacia',
      services: 'Servicios'
    };

    const message = `*Nuevo Pedido de ${storeNames[storeType]}*\n\n` +
      cart.map(item =>
        `• ${item.name}\n` +
        `  ${item.quantity} x $${item.price.toFixed(2)} = $${(item.quantity * item.price).toFixed(2)}`
      ).join('\n\n') +
      `\n\n*Total: $${total.toFixed(2)}*`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Tu carrito está vacío
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="space-y-4 max-h-[60vh] overflow-y-auto">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateQuantity(item.id, Math.max(0, (item.quantity ?? 0) - 1))}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-8 text-center">{item.quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateQuantity(item.id, (item.quantity ?? 0) + 1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => removeFromCart(item.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <div className="flex gap-4">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => cart.forEach(item => removeFromCart(item.id))}
          >
            Vaciar Carrito
          </Button>
          <Button
            className="flex-1"
            onClick={handleWhatsAppCheckout}
          >
            Pedir por WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
