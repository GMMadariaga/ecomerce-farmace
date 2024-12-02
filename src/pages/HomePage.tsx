import { Store as StoreIcon, Pill, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { stores } from '../data/stores';
import { HomeHeader } from '../components/HomeHeader';
import { Footer } from '../components/Footer';
import { PromotionCard } from '../components/PromotionCard';
import { ContactSection } from '../components/ContactSection';

export function HomePage() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Store':
        return <StoreIcon className="w-8 h-8 text-blue-600" />;
      case 'Pill':
        return <Pill className="w-8 h-8 text-blue-600" />;
      case 'Wrench':
        return <Wrench className="w-8 h-8 text-blue-600" />;
      default:
        return <StoreIcon className="w-8 h-8 text-blue-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HomeHeader />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">Bienvenido a Nuestras Tiendas</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {stores.map((store) => (
            <Link
              key={store.id}
              to={`/${store.id}`}
              className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4">
                {getIcon(store.icon)}
                <div>
                  <h2 className="text-2xl font-semibold">{store.name}</h2>
                  <p className="text-gray-600 mt-2">{store.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Promociones del Día</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <PromotionCard title="Promoción 1" description="Descripción de la promoción 1" />
            <PromotionCard title="Promoción 2" description="Descripción de la promoción 2" />
            <PromotionCard title="Promoción 3" description="Descripción de la promoción 3" />
          </div>
        </div>

        <ContactSection />
      </div>
      <Footer />
    </div>
  );
}
