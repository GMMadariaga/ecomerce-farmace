import { ReactNode } from 'react';
import { Cart } from './Cart';

interface StoreLayoutProps {
  storeType: 'home' | 'pharmacy';
  children: ReactNode;
}

export function StoreLayout({ storeType, children }: StoreLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {children}
          </div>
          <div className="bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold p-4 border-b">
              Your Cart
            </h2>
            <Cart storeType={storeType} />
          </div>
        </div>
      </div>
    </div>
  );
}