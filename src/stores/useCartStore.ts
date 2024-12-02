import { create } from 'zustand';
import { CartItem, Product } from '../types';

interface CartStore {
  homeCart: CartItem[];
  pharmacyCart: CartItem[];
  servicesCart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (storeType: 'home' | 'pharmacy' | 'services', productId: string) => void;
  updateQuantity: (storeType: 'home' | 'pharmacy' | 'services', productId: string, quantity: number) => void;
  clearCart: (storeType: 'home' | 'pharmacy' | 'services') => void;
}

export const useCartStore = create<CartStore>((set) => ({
  homeCart: [],
  pharmacyCart: [],
  servicesCart: [],
  
  addToCart: (product, quantity) => set((state) => {
    const cartKey = `${product.storeType}Cart` as 'homeCart' | 'pharmacyCart' | 'servicesCart';
    const cart = state[cartKey];
    const existingItem = cart.find(item => item.product.id === product.id);
    
    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      return { [cartKey]: updatedCart };
    }
    
    const updatedCart = [...cart, { product, quantity }];
    return { [cartKey]: updatedCart };
  }),
  
  removeFromCart: (storeType, productId) => set((state) => ({
    [`${storeType}Cart`]: state[`${storeType}Cart`].filter(item => item.product.id !== productId)
  })),
  
  updateQuantity: (storeType, productId, quantity) => set((state) => ({
    [`${storeType}Cart`]: state[`${storeType}Cart`].map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    )
  })),
  
  clearCart: (storeType) => set(() => ({
    [`${storeType}Cart`]: []
  })),
}));