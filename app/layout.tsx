import './globals.css';
import { Inter } from 'next/font/google';
import Header from './components/Header';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'EcoMedShop',
  description: 'Tu tienda en línea para productos de mercado y farmacia',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Header />
        <main className="container mx-auto mt-8 px-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}