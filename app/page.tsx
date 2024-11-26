import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Bienvenido a EcoMedShop</h1>
      <p className="mb-8">Tu tienda en línea para productos de mercado y farmacia</p>
      <div className="flex justify-center space-x-4">
        <Link href="/mercado" className="bg-green-500 text-white px-4 py-2 rounded">
          Ir al Mercado
        </Link>
        <Link href="/farmacia" className="bg-red-500 text-white px-4 py-2 rounded">
          Ir a la Farmacia
        </Link>
      </div>
    </div>
  );
}