export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 fixed bottom-0 w-full">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Nuestras Tiendas. Todos los derechos reservados.</p>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/privacy" className="hover:underline">Política de Privacidad</a></li>
            <li><a href="/terms" className="hover:underline">Términos y Condiciones</a></li>
            <li><a href="/support" className="hover:underline">Soporte</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
