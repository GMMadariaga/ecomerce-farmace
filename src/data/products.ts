// import { Product } from '../types';

// export const products: Product[] = [
//   {
//     id: 'home-1',
//     name: 'Cafetera Moderna',
//     description: 'Cafetera programable de 12 tazas con apagado automático',
//     price: 79.99,
//     image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&q=80&w=800',
//     category: 'Electrodomésticos',
//     stock: 15,
//     storeType: 'home'
//   },
//   {
//     id: 'home-2',
//     name: 'Juego de Vajilla de Cerámica',
//     description: 'Set moderno de 16 piezas para 4 personas',
//     price: 129.99,
//     image: 'https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&q=80&w=800',
//     category: 'Cocina',
//     stock: 10,
//     storeType: 'home'
//   },
//   {
//     id: 'home-3',
//     name: 'Set de Utensilios de Cocina',
//     description: 'Juego completo de utensilios de acero inoxidable',
//     price: 49.99,
//     image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&q=80&w=800',
//     category: 'Cocina',
//     stock: 20,
//     storeType: 'home'
//   },
//   {
//     id: 'home-4',
//     name: 'Cafetera Moderna',
//     description: 'Cafetera programable de 12 tazas con apagado automático',
//     price: 79.99,
//     image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&q=80&w=800',
//     category: 'Electrodomésticos',
//     stock: 15,
//     storeType: 'home'
//   },
//   {
//     id: 'home-5',
//     name: 'Juego de Vajilla de Cerámica',
//     description: 'Set moderno de 16 piezas para 4 personas',
//     price: 129.99,
//     image: 'https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&q=80&w=800',
//     category: 'Cocina',
//     stock: 10,
//     storeType: 'home'
//   },
//   {
//     id: 'home-6',
//     name: 'Set de Utensilios de Cocina',
//     description: 'Juego completo de utensilios de acero inoxidable',
//     price: 49.99,
//     image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&q=80&w=800',
//     category: 'Cocina',
//     stock: 20,
//     storeType: 'home'
//   },



//   {
//     id: 'pharmacy-1',
//     name: 'Suplemento de Vitamina C',
//     description: 'Tabletas de 1000mg - 90 unidades',
//     price: 24.99,
//     image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=800',
//     category: 'Vitaminas',
//     stock: 50,
//     storeType: 'pharmacy'
//   },
//   {
//     id: 'pharmacy-2',
//     name: 'Botiquín de Primeros Auxilios',
//     description: 'Kit completo de emergencia para uso doméstico',
//     price: 34.99,
//     image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=800',
//     category: 'Primeros Auxilios',
//     stock: 25,
//     storeType: 'pharmacy'
//   },
//   {
//     id: 'pharmacy-3',
//     name: 'Termómetro Digital',
//     description: 'Termómetro de lectura rápida y precisa',
//     price: 19.99,
//     image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=800',
//     category: 'Dispositivos Médicos',
//     stock: 30,
//     storeType: 'pharmacy'
//   },
//   {
//     id: 'pharmacy-4',
//     name: 'Suplemento de Vitamina C',
//     description: 'Tabletas de 1000mg - 90 unidades',
//     price: 24.99,
//     image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=800',
//     category: 'Vitaminas',
//     stock: 50,
//     storeType: 'pharmacy'
//   },
//   {
//     id: 'pharmacy-5',
//     name: 'Botiquín de Primeros Auxilios',
//     description: 'Kit completo de emergencia para uso doméstico',
//     price: 34.99,
//     image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=800',
//     category: 'Primeros Auxilios',
//     stock: 25,
//     storeType: 'pharmacy'
//   },
//   {
//     id: 'pharmacy-6',
//     name: 'Termómetro Digital',
//     description: 'Termómetro de lectura rápida y precisa',
//     price: 19.99,
//     image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=800',
//     category: 'Dispositivos Médicos',
//     stock: 30,
//     storeType: 'pharmacy'
//   },



//   {
//     id: 'services-1',
//     name: 'Limpieza del Hogar',
//     description: 'Servicio profesional de limpieza - 4 horas',
//     price: 89.99,
//     image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800',
//     category: 'Limpieza',
//     stock: 999,
//     storeType: 'services'
//   },
//   {
//     id: 'services-2',
//     name: 'Mantenimiento de Jardín',
//     description: 'Servicio completo de jardinería',
//     price: 75.00,
//     image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&q=80&w=800',
//     category: 'Jardinería',
//     stock: 999,
//     storeType: 'services'
//   },
//   {
//     id: 'services-3',
//     name: 'Reparación de Electrodomésticos',
//     description: 'Servicio técnico especializado a domicilio',
//     price: 65.00,
//     image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800',
//     category: 'Reparaciones',
//     stock: 999,
//     storeType: 'services'
//   }
//   ,
//   {
//     id: 'services-4',
//     name: 'Limpieza del Hogar',
//     description: 'Servicio profesional de limpieza - 4 horas',
//     price: 89.99,
//     image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800',
//     category: 'Limpieza',
//     stock: 999,
//     storeType: 'services'
//   },
//   {
//     id: 'services-5',
//     name: 'Mantenimiento de Jardín',
//     description: 'Servicio completo de jardinería',
//     price: 75.00,
//     image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&q=80&w=800',
//     category: 'Jardinería',
//     stock: 999,
//     storeType: 'services'
//   },
//   {
//     id: 'services-6',
//     name: 'Reparación de Electrodomésticos',
//     description: 'Servicio técnico especializado a domicilio',
//     price: 65.00,
//     image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800',
//     category: 'Reparaciones',
//     stock: 999,
//     storeType: 'services'
//   }
// ];