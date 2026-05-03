import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCartById } from "../services/carts.service";
import { FaBoxOpen, FaArrowLeft, FaUserCircle } from "react-icons/fa";
import ProductModal from "../components/common/ProductModal";
import { getProductById } from "../services/products.service"; // لو عندك API للمنتج

const CartDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCartById(id);
        setCart(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [id]);

  const handleViewProduct = async (cartProduct) => {
    try {
      // جلب بيانات المنتج من API لو عندك
      let productDetails;
      if (getProductById) {
        productDetails = await getProductById(cartProduct.productId);
      } else {
        // dummy data لو ما عندكش API
        productDetails = {
          productId: cartProduct.productId,
          title: "Sample Product " + cartProduct.productId,
          price: 99.99,
          image: "https://via.placeholder.com/150",
          category: "Category Name",
          description: "Description for product " + cartProduct.productId,
        };
      }

      // أهم خطوة: إضافة الكمية من الكارت
      setSelectedProduct({
        ...productDetails,
        quantity: cartProduct.quantity, // <--- الكمية الحقيقية من الكارت
      });
    } catch (err) {
      console.error("Failed to fetch product details:", err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500 animate-pulse text-lg font-medium">
          Loading Cart...
        </p>
      </div>
    );

  if (!cart)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-red-500 font-semibold text-lg">Cart not found!</p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard/carts")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition"
      >
        <FaArrowLeft /> Back to Carts
      </button>

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600">
        <span
          className="text-blue-600 cursor-pointer hover:underline"
          onClick={() => navigate("/dashboard/carts")}
        >
          Carts
        </span>{" "}
        &gt; <span className="ml-1">Cart #{cart.id}</span>
      </nav>

      {/* Main Card */}
      <div className="bg-white shadow-xl rounded-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-6 text-white space-y-2">
          <h1 className="text-3xl font-bold">Cart Details</h1>
          <div className="flex flex-col sm:flex-row sm:gap-6 items-start sm:items-center">
            <p className="flex items-center gap-2 font-medium">
              <FaBoxOpen /> Cart ID: {cart.id}
            </p>
            <p className="flex items-center gap-2 font-medium">
              <FaUserCircle /> User ID: {cart.userId}
            </p>
          </div>
          <p className="font-semibold mt-2">
            Total Items: {cart.products.reduce((sum, p) => sum + p.quantity, 0)}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200" />

        {/* Products List */}
        <div className="p-6 grid gap-4 md:grid-cols-2">
          {cart.products.map((p) => (
            <div
              key={p.productId}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition hover:bg-gray-100"
            >
              {/* Product ID */}
              <span className="font-medium text-gray-700">
                Product ID: {p.productId}
              </span>

              {/* Quantity + View Button */}
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 font-semibold text-gray-800">
                  <FaBoxOpen /> {p.quantity}
                </span>

                <button
                  onClick={() => handleViewProduct(p)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default CartDetails;
