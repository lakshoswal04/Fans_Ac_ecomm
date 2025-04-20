import React, { useState, useEffect } from 'react';
import { FaPlus, FaPencilAlt, FaTrash, FaSearch } from 'react-icons/fa';
import Sidebar from '../../components/admin/Sidebar';
import Modal from '../../components/ui/Modal';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: '',
    colors: '',
    sizes: '',
    inventory: ''
  });

  // Categories for filtering
  const categories = ['All', 'Ceiling Fan', 'Table Fan', 'Air Conditioner'];

  useEffect(() => {
    // Simulate fetching products from API
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      const mockProducts = [
        {
          id: 1,
          name: 'Premium Ceiling Fan',
          image: 'https://imgs.search.brave.com/hHyvBOsh_msIAdfKXhsvKksKhWPw38KRNfPUD_J4knc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFScmVkN3VTZ0wu/anBn',
          price: 199.99,
          category: 'Ceiling Fan',
          colors: ['Gold', 'Black', 'Brown'],
          sizes: ['Small', 'Medium', 'Large'],
          inventory: 45,
          description: 'High-performance ceiling fan with LED lighting and remote control.'
        },
        {
          id: 2,
          name: 'Decorative Ceiling Fan',
          image: 'https://www.istockphoto.com/photos/ceiling-fan',
          price: 249.99,
          category: 'Ceiling Fan',
          colors: ['Silver', 'Gold', 'Bronze'],
          sizes: ['Medium', 'Large'],
          inventory: 32,
          description: 'Elegant ceiling fan with wooden blades and decorative elements.'
        },
        {
          id: 3,
          name: 'Table Fan',
          image: 'https://unsplash.com/photos/black-and-green-desk-fan-Gx2SU87s4WY',
          price: 49.99,
          category: 'Table Fan',
          colors: ['White', 'Black', 'Blue'],
          sizes: ['Small', 'Medium'],
          inventory: 78,
          description: 'Compact and powerful table fan with oscillation feature.'
        },
        {
          id: 4,
          name: 'Industrial Fan',
          image: 'https://www.istockphoto.com/photos/desk-fan',
          price: 129.99,
          category: 'Table Fan',
          colors: ['Silver', 'Black'],
          sizes: ['Medium', 'Large'],
          inventory: 23,
          description: 'Heavy-duty industrial fan with high airflow and durable construction.'
        },
        {
          id: 5,
          name: 'Smart AC 1.5 Ton',
          image: 'https://images.unsplash.com/photo-1600697230063-f51e4a0b05f2',
          price: 599.99,
          category: 'Air Conditioner',
          colors: ['White'],
          sizes: ['1.5 Ton'],
          inventory: 15,
          description: 'Smart air conditioner with Wi-Fi connectivity and energy-saving features.'
        },
        {
          id: 6,
          name: 'Inverter AC 2 Ton',
          image: 'https://images.unsplash.com/photo-1600697230063-f51e4a0b05f2',
          price: 799.99,
          category: 'Air Conditioner',
          colors: ['White', 'Silver'],
          sizes: ['2 Ton'],
          inventory: 10,
          description: 'Energy-efficient inverter AC with cooling and heating functions.'
        }
      ];
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  };

  const openAddModal = () => {
    setFormData({
      name: '',
      category: 'Ceiling Fan',
      price: '',
      description: '',
      image: '',
      colors: '',
      sizes: '',
      inventory: ''
    });
    setShowAddModal(true);
  };

  const openEditModal = (product) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      image: product.image,
      colors: product.colors.join(', '),
      sizes: product.sizes.join(', '),
      inventory: product.inventory
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (product) => {
    setCurrentProduct(product);
    setShowDeleteModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    
    // Convert string inputs to arrays
    const colors = formData.colors.split(',').map(color => color.trim());
    const sizes = formData.sizes.split(',').map(size => size.trim());
    
    const newProduct = {
      id: products.length + 1,
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      description: formData.description,
      image: formData.image,
      colors: colors,
      sizes: sizes,
      inventory: parseInt(formData.inventory)
    };
    
    setProducts([...products, newProduct]);
    setShowAddModal(false);
    
    // Show success notification (implement as needed)
    alert('Product added successfully!');
  };

  const handleEditProduct = (e) => {
    e.preventDefault();
    
    // Convert string inputs to arrays
    const colors = formData.colors.split(',').map(color => color.trim());
    const sizes = formData.sizes.split(',').map(size => size.trim());
    
    const updatedProducts = products.map(product => {
      if (product.id === currentProduct.id) {
        return {
          ...product,
          name: formData.name,
          category: formData.category,
          price: parseFloat(formData.price),
          description: formData.description,
          image: formData.image,
          colors: colors,
          sizes: sizes,
          inventory: parseInt(formData.inventory)
        };
      }
      return product;
    });
    
    setProducts(updatedProducts);
    setShowEditModal(false);
    
    // Show success notification (implement as needed)
    alert('Product updated successfully!');
  };

  const handleDeleteProduct = () => {
    const updatedProducts = products.filter(product => product.id !== currentProduct.id);
    setProducts(updatedProducts);
    setShowDeleteModal(false);
    
    // Show success notification (implement as needed)
    alert('Product deleted successfully!');
  };

  // Filter products based on search query and selected category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full p-4 lg:p-8">
        <h1 className="text-2xl font-bold mb-6">Product Management</h1>
        
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="relative w-full md:w-64 mb-4 md:mb-0">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 border rounded-lg w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-4 w-full md:w-auto">
              <select
                className="border rounded-lg px-4 py-2"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
              
              <button
                onClick={openAddModal}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <FaPlus className="mr-2" /> Add Product
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-4 text-left">ID</th>
                      <th className="py-2 px-4 text-left">Image</th>
                      <th className="py-2 px-4 text-left">Name</th>
                      <th className="py-2 px-4 text-left">Category</th>
                      <th className="py-2 px-4 text-left">Price</th>
                      <th className="py-2 px-4 text-left">Inventory</th>
                      <th className="py-2 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="border-b">
                        <td className="py-2 px-4">{product.id}</td>
                        <td className="py-2 px-4">
                          <div className="w-12 h-12 bg-gray-200 rounded">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover rounded"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/50';
                              }}
                            />
                          </div>
                        </td>
                        <td className="py-2 px-4">{product.name}</td>
                        <td className="py-2 px-4">{product.category}</td>
                        <td className="py-2 px-4">${product.price.toFixed(2)}</td>
                        <td className="py-2 px-4">{product.inventory}</td>
                        <td className="py-2 px-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openEditModal(product)}
                              className="p-1 text-blue-600 hover:text-blue-800"
                            >
                              <FaPencilAlt />
                            </button>
                            <button
                              onClick={() => openDeleteModal(product)}
                              className="p-1 text-red-600 hover:text-red-800"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No products found. Try a different search or category.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      {/* Add Product Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Product">
        <form onSubmit={handleAddProduct}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border rounded"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              className="w-full p-2 border rounded"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              {categories.filter(cat => cat !== 'All').map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Price ($)</label>
            <input
              type="number"
              name="price"
              className="w-full p-2 border rounded"
              value={formData.price}
              onChange={handleInputChange}
              step="0.01"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="url"
              name="image"
              className="w-full p-2 border rounded"
              value={formData.image}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Colors (comma separated)</label>
            <input
              type="text"
              name="colors"
              className="w-full p-2 border rounded"
              value={formData.colors}
              onChange={handleInputChange}
              placeholder="White, Black, Blue"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Sizes (comma separated)</label>
            <input
              type="text"
              name="sizes"
              className="w-full p-2 border rounded"
              value={formData.sizes}
              onChange={handleInputChange}
              placeholder="Small, Medium, Large"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Inventory</label>
            <input
              type="number"
              name="inventory"
              className="w-full p-2 border rounded"
              value={formData.inventory}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              className="w-full p-2 border rounded"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              required
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 border rounded text-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Add Product
            </button>
          </div>
        </form>
      </Modal>
      
      {/* Edit Product Modal */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Product">
        <form onSubmit={handleEditProduct}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border rounded"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              className="w-full p-2 border rounded"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              {categories.filter(cat => cat !== 'All').map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Price ($)</label>
            <input
              type="number"
              name="price"
              className="w-full p-2 border rounded"
              value={formData.price}
              onChange={handleInputChange}
              step="0.01"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="url"
              name="image"
              className="w-full p-2 border rounded"
              value={formData.image}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Colors (comma separated)</label>
            <input
              type="text"
              name="colors"
              className="w-full p-2 border rounded"
              value={formData.colors}
              onChange={handleInputChange}
              placeholder="White, Black, Blue"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Sizes (comma separated)</label>
            <input
              type="text"
              name="sizes"
              className="w-full p-2 border rounded"
              value={formData.sizes}
              onChange={handleInputChange}
              placeholder="Small, Medium, Large"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Inventory</label>
            <input
              type="number"
              name="inventory"
              className="w-full p-2 border rounded"
              value={formData.inventory}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              className="w-full p-2 border rounded"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              required
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowEditModal(false)}
              className="px-4 py-2 border rounded text-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Update Product
            </button>
          </div>
        </form>
      </Modal>
      
      {/* Delete Confirmation Modal */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Confirm Delete">
        <div className="mb-4">
          <p>Are you sure you want to delete the product "{currentProduct?.name}"? This action cannot be undone.</p>
        </div>
        
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 border rounded text-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteProduct}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Products; 