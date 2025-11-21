import React, { useEffect, useState } from 'react';
import { getProducts, updateProductService } from '../services/api.service';
import { Package, Edit } from 'lucide-react';

const AdminProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({
    isFeatured: false,
    isRecommended: false,
    isBestDeal: false,
    offerEndsAt: ''
  });

  const hoursOptions = Array.from({ length: 12 }, (_, i) => (i + 1) * 2); // 2,4,...24

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      setProducts(res.data.products);
    } catch (err) {
      console.error('Error fetching products', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Open modal and prefill data
  const openEditModal = (product) => {
    setEditProduct(product);
    const remainingHours = product.offerEndsAt
      ? Math.ceil((new Date(product.offerEndsAt) - new Date()) / (1000 * 60 * 60))
      : '';
    setFormData({
      isFeatured: product.isFeatured || false,
      isRecommended: product.isRecommended || false,
      isBestDeal: product.isBestDeal || false,
      offerEndsAt: remainingHours
    });
    setShowModal(true);
  };

  // Handle form input changes
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Update product API
  const handleUpdate = async () => {
    if (!editProduct) return;
    try {
      const updatedData = { ...formData };
      if (formData.offerEndsAt) {
        updatedData.offerEndsAt = new Date(Date.now() + formData.offerEndsAt * 60 * 60 * 1000);
      }
      await updateProductService(editProduct._id, updatedData);

      setProducts(prev =>
        prev.map(p => (p._id === editProduct._id ? { ...p, ...updatedData } : p))
      );
      setShowModal(false);
      setEditProduct(null);
    } catch (err) {
      console.error('Error updating product', err);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-700 mb-6">
          Admin: Product Management
        </h1>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white p-12 rounded-xl shadow-lg">
              <Package className="mx-auto mb-4 text-orange-400" size={64} />
              <p>No products found</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-3"
              >
                <div className="h-40 overflow-hidden rounded-xl">
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-orange-100">
                      <Package size={48} className="text-orange-300" />
                    </div>
                  )}
                </div>

                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-orange-600 font-medium">₹{product.price}</p>

                <button
                  onClick={() => openEditModal(product)}
                  className="flex items-center gap-2 mt-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition"
                >
                  <Edit size={16} />
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border-2 border-orange-100">
              <h2 className="text-2xl font-bold text-orange-700 mb-4">Update Product</h2>

              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={e => handleChange('isFeatured', e.target.checked)}
                  />
                  Featured
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isRecommended}
                    onChange={e => handleChange('isRecommended', e.target.checked)}
                  />
                  Recommended
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isBestDeal}
                    onChange={e => handleChange('isBestDeal', e.target.checked)}
                  />
                  Best Deal
                </label>

                <label className="flex items-center gap-2">
                  Offer Ends In:
                  <select
                    value={formData.offerEndsAt}
                    onChange={e => handleChange('offerEndsAt', Number(e.target.value))}
                    className="border-2 border-gray-300 rounded-lg p-1"
                  >
                    <option value="">Select hours</option>
                    {hoursOptions.map(h => (
                      <option key={h} value={h}>
                        {h} Hours
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditProduct(null);
                  }}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProductManagement;
