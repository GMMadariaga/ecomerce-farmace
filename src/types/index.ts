export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  imageType: string;
  category: string;
  stock: number;
  storeType: 'home' | 'pharmacy' | 'services';
  quantity?: number; // Hacer que sea opcional
}



export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Store {
  id: 'home' | 'pharmacy' | 'services';
  name: string;
  description: string;
  icon: string;
}
