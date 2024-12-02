interface PromotionCardProps {
    title: string;
    description: string;
  }
  
  export function PromotionCard({ title, description }: PromotionCardProps) {
    return (
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg shadow-lg p-6 hover:scale-105 transform transition-transform duration-300">
        <h3 className="text-3xl font-bold text-purple-800">{title}</h3>
        <p className="text-gray-700 mt-4 text-lg">{description}</p>
        <button className="mt-6 bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-700 transition-colors">
          Más Información
        </button>
      </div>
    );
  }
  