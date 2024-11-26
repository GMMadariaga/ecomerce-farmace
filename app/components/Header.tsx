import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          EcoMedShop
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/mercado">Mercado</Link></li>
            <li><Link href="/farmacia">Farmacia</Link></li>
            <li><Link href="/login">Iniciar sesión</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}