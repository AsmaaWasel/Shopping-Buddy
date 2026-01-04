// ProductCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const handleView = () => {
    navigate(`/dashboard/products/${product.id}`);
  };
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      {/* صورة المنتج */}
      <img
        src={product.image}
        alt={product.title}
        className="w-full object-cover rounded-md"
      />

      {/* عنوان المنتج */}
      <h2 className="text-lg font-bold mt-2 line-clamp-2">{product.title}</h2>

      {/* السعر */}
      <p className="text-indigo-600 font-semibold mt-1">${product.price}</p>

      {/* التقييم */}
      <p className="text-sm text-gray-500 mt-1">
        ⭐ {product.rating.rate} ({product.rating.count})
      </p>

      {/* زرار */}
      <button
        onClick={handleView}
        className="bg-indigo-600 text-white py-1 px-3 rounded mt-3 hover:bg-indigo-500"
      >
        View Product
      </button>
    </div>
  );
};

export default ProductCard;
