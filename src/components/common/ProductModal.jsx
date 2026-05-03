// src/components/common/ProductModal.jsx
import React from "react";

const ProductModal = ({ product, onClose }) => {
  if (!product) return null; // لو مفيش منتج مختار، لا يظهر المودال

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full relative">
        {/* زر إغلاق */}
        <button
          className="absolute top-2 right-2 text-gray-500 text-xl font-bold"
          onClick={onClose}
        >
          ✕
        </button>

        {/* محتوى المنتج */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover rounded mb-4"
        />
        <h2 className="text-xl font-bold mb-2">{product.title}</h2>
        <p className="text-gray-600 mb-1">{product.category}</p>
        <p className="text-gray-800 mb-2">{product.description}</p>
        <p className="font-semibold text-blue-600">${product.price}</p>
        <p><span className="font-semibold">Quantity:</span> {product.quantity}</p>

      </div>
    </div>
  );
};

export default ProductModal;
