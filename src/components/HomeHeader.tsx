import { Link } from 'react-router-dom';

export function HomeHeader() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Nuestras Tiendas</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="text-blue-600 hover:underline">Inicio</Link></li>
            <li><Link to="/admin" className="text-blue-600 hover:underline">Admin</Link></li>
            <li><Link to="/contact" className="text-blue-600 hover:underline">Contacto</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
