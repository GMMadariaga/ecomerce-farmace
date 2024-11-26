'use client';

export default function WhatsAppButton({ message }: { message: string }) {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="bg-green-500 text-white px-4 py-2 rounded"
    >
      Enviar por WhatsApp
    </button>
  );
}

