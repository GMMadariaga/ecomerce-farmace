import { useState, useEffect } from 'react';
import ExcelJS from 'exceljs';
import { Product } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    id: '',
    name: '',
    description: '',
    price: 0,
    image: '',
    imageType: '',
    category: '',
    stock: 0,
    storeType: 'home',
    quantity: 0,
  });
  const [activeTab, setActiveTab] = useState<'profile' | 'addProduct' | 'uploadExcel' | 'changePassword'>('profile');
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      fetch('http://localhost:3001/products')
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setProducts(data);
          }
        })
        .catch((error) => console.error('Error al cargar productos:', error));
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    const newProductId = `${newProduct.storeType}-${Date.now()}`;
    const productToAdd = { ...newProduct, id: newProductId };

    fetch('http://localhost:3001/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productToAdd),
    })
      .then(() => {
        setProducts((prevProducts) => [...prevProducts, productToAdd]);
        setNewProduct({
          id: '',
          name: '',
          description: '',
          price: 0,
          image: '',
          imageType: '',
          category: '',
          stock: 0,
          storeType: 'home',
          quantity: 0,
        });
      })
      .catch((error) => console.error('Error al agregar producto:', error));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const workbook = new ExcelJS.Workbook();
    const arrayBuffer = await file.arrayBuffer();
    await workbook.xlsx.load(arrayBuffer);

    const sheet = workbook.getWorksheet(1);
    if (!sheet) {
      alert('No se encontró la hoja 1 en el archivo Excel.');
      return;
    }

    const newProducts: Product[] = [];
    sheet.eachRow((row, rowIndex) => {
      if (rowIndex === 1) return; // Ignorar la primera fila (encabezados)

      const storeType = row.getCell(8).value?.toString() as 'home' | 'pharmacy' | 'services';
      if (!['home', 'pharmacy', 'services'].includes(storeType)) {
        alert(`Tipo de tienda inválido en la fila ${rowIndex}: ${storeType}`);
        return;
      }

      const imageType = row.getCell(5).value?.toString().toLowerCase() || ''; // Proporcionar un valor predeterminado
      const product: Product = {
        id: `${storeType}-${Date.now()}`,
        name: row.getCell(1).value?.toString() || '',
        description: row.getCell(2).value?.toString() || '',
        price: parseFloat(row.getCell(3).value?.toString() || '0'),
        image: row.getCell(4).value?.toString() || '',
        imageType: imageType,
        category: row.getCell(6).value?.toString() || '',
        stock: parseInt(row.getCell(7).value?.toString() || '0', 10),
        storeType,
      };

      newProducts.push(product);
    });

    try {
      const responses = await Promise.all(
        newProducts.map((product) =>
          fetch('http://localhost:3001/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
          })
        )
      );

      const successfulResponses = responses.filter((response) => response.ok);
      if (successfulResponses.length === newProducts.length) {
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      } else {
        alert('Algunos productos no se pudieron cargar.');
      }
    } catch (error) {
      console.error('Error al cargar productos desde Excel:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    if (newPassword === confirmPassword) {
      const response = await fetch('http://localhost:3001/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });

      if (response.ok) {
        alert('Contraseña cambiada con éxito');
      } else {
        alert('Error al cambiar la contraseña');
      }
    } else {
      alert('Las contraseñas no coinciden');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl mb-4">Lista de Productos</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Producto</th>
              <th className="px-4 py-2 border">Categoría</th>
              <th className="px-4 py-2 border">Precio</th>
              <th className="px-4 py-2 border">Imagen</th>
              <th className="px-4 py-2 border">Stock</th>
              <th className="px-4 py-2 border">Tienda</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 py-2 border">{product.name}</td>
                  <td className="px-4 py-2 border">{product.category}</td>
                  <td className="px-4 py-2 border">{product.price}</td>
                  <td className="px-4 py-2 border">
                    <img src={`/images/${product.image}.${product.imageType}`} alt={product.name} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="px-4 py-2 border">{product.stock}</td>
                  <td className="px-4 py-2 border">{product.storeType}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center px-4 py-2 border">
                  No hay productos disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-center">Panel de Administración</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Cerrar Sesión
          </button>
        </div>

        <div className="mb-8">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 ${activeTab === 'profile' ? 'border-b-2 border-blue-500' : ''}`}
            >
              Perfil de Usuario
            </button>
            <button
              onClick={() => setActiveTab('addProduct')}
              className={`px-4 py-2 ${activeTab === 'addProduct' ? 'border-b-2 border-blue-500' : ''}`}
            >
              Agregar Nuevo Producto
            </button>
            <button
              onClick={() => setActiveTab('uploadExcel')}
              className={`px-4 py-2 ${activeTab === 'uploadExcel' ? 'border-b-2 border-blue-500' : ''}`}
            >
              Cargar Productos desde Excel
            </button>
            <button
              onClick={() => setActiveTab('changePassword')}
              className={`px-4 py-2 ${activeTab === 'changePassword' ? 'border-b-2 border-blue-500' : ''}`}
            >
              Cambiar Contraseña
            </button>
          </div>

          {activeTab === 'profile' && (
            <div className="mt-4">
              <h2 className="text-2xl mb-4">Perfil de Usuario</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    value="admin"
                    readOnly
                    className="p-2 border rounded focus:outline-none focus:border-blue-500"
                  />
                  <label className="absolute left-2 -top-3 bg-white px-1 text-gray-600 text-sm transition-all duration-300">
                    Nombre de Usuario
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    value="admin123"
                    readOnly
                    className="p-2 border rounded focus:outline-none focus:border-blue-500"
                  />
                  <label className="absolute left-2 -top-3 bg-white px-1 text-gray-600 text-sm transition-all duration-300">
                    Contraseña Actual
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'addProduct' && (
            <div className="mt-4">
              <h2 className="text-2xl mb-4">Agregar Nuevo Producto</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    className="p-2 border rounded focus:outline-none focus:border-blue-500"
                  />
                  <label className="absolute left-2 -top-3 bg-white px-1 text-gray-600 text-sm transition-all duration-300">
                    Nombre
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="category"
                    value={newProduct.category}
                    onChange={handleInputChange}
                    className="p-2 border rounded focus:outline-none focus:border-blue-500"
                  />
                  <label className="absolute left-2 -top-3 bg-white px-1 text-gray-600 text-sm transition-all duration-300">
                    Categoría
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    className="p-2 border rounded focus:outline-none focus:border-blue-500"
                  />
                  <label className="absolute left-2 -top-3 bg-white px-1 text-gray-600 text-sm transition-all duration-300">
                    Precio
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    name="stock"
                    value={newProduct.stock}
                    onChange={handleInputChange}
                    className="p-2 border rounded focus:outline-none focus:border-blue-500"
                  />
                  <label className="absolute left-2 -top-3 bg-white px-1 text-gray-600 text-sm transition-all duration-300">
                    Stock
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="image"
                    value={newProduct.image}
                    onChange={handleInputChange}
                    className="p-2 border rounded focus:outline-none focus:border-blue-500"
                  />
                  <label className="absolute left-2 -top-3 bg-white px-1 text-gray-600 text-sm transition-all duration-300">
                    Nombre de Imagen
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="imageType"
                    value={newProduct.imageType}
                    onChange={handleInputChange}
                    className="p-2 border rounded focus:outline-none focus:border-blue-500"
                  />
                  <label className="absolute left-2 -top-3 bg-white px-1 text-gray-600 text-sm transition-all duration-300">
                    Tipo de Imagen
                  </label>
                </div>
                <div className="relative">
                  <select
                    name="storeType"
                    value={newProduct.storeType}
                    onChange={handleInputChange}
                    className="p-2 border rounded focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Tipo de Tienda</option>
                    <option value="home">Hogar</option>
                    <option value="pharmacy">Farmacia</option>
                    <option value="services">Servicios</option>
                  </select>
                  <label className="absolute left-2 -top-3 bg-white px-1 text-gray-600 text-sm transition-all duration-300">
                    Tipo de Tienda
                  </label>
                </div>
              </div>
              <button
                onClick={handleAddProduct}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded"
              >
                Agregar Producto
              </button>
            </div>
          )}

          {activeTab === 'uploadExcel' && (
            <div className="mt-4">
              <h2 className="text-2xl mb-4">Cargar Productos desde Excel</h2>
              <input type="file" accept=".xlsx" onChange={handleFileUpload} />
            </div>
          )}

          {activeTab === 'changePassword' && (
            <div className="mt-4">
              <h2 className="text-2xl mb-4">Cambiar Contraseña</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="p-2 border rounded focus:outline-none focus:border-blue-500"
                  />
                  <label className="absolute left-2 -top-3 bg-white px-1 text-gray-600 text-sm transition-all duration-300">
                    Nueva Contraseña
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="p-2 border rounded focus:outline-none focus:border-blue-500"
                  />
                  <label className="absolute left-2 -top-3 bg-white px-1 text-gray-600 text-sm transition-all duration-300">
                    Confirmar Contraseña
                  </label>
                </div>
              </div>
              <button
                onClick={handleChangePassword}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded"
              >
                Cambiar Contraseña
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
