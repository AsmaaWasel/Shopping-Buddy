// ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductById } from "../services/products.service";
import SplashLoader from "../components/common/SplashLoader";
import ActionButton from "../components/common/ActionButton";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);

  // 🔹 Fetch product
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  // 🔹 عندما تأتي البيانات → نحطها في الفورم
  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  if (isLoading) return <SplashLoader />;
  if (error) return <div>Error fetching product</div>;

  // 🔹 تغيير قيم الفورم
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 حفظ التعديلات
  const handleSave = () => {
    // ⚡ تحديث الكاش مباشرة
    queryClient.setQueryData(["product", id], formData);

    toast.success("Product updated successfully!");
    setIsEditing(false);
  };

  // 🔹 إلغاء التعديل
  const handleCancel = () => {
    setFormData(product);
    setIsEditing(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow mt-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product Details</h1>

        {!isEditing && (
          <ActionButton variant="edit" onClick={() => setIsEditing(true)}>
            Edit
          </ActionButton>
        )}
      </div>

      {/* Image */}
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-96 object-contain rounded-md"
      />

      {/* Title */}
      <div className="mt-4">
        <label className="block text-sm text-gray-500 mb-1">Title</label>
        {isEditing ? (
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        ) : (
          <h2 className="text-xl font-semibold">{product.title}</h2>
        )}
      </div>

      {/* Price */}
      <div className="mt-4">
        <label className="block text-sm text-gray-500 mb-1">Price</label>
        {isEditing ? (
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        ) : (
          <p className="text-indigo-600 font-semibold text-lg">
            ${product.price}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="mt-4">
        <label className="block text-sm text-gray-500 mb-1">Description</label>
        {isEditing ? (
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={4}
          />
        ) : (
          <p className="text-gray-700">{product.description}</p>
        )}
      </div>

      {/* Category */}
      <div className="mt-4">
        <label className="block text-sm text-gray-500 mb-1">Category</label>
        {isEditing ? (
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        ) : (
          <p className="text-gray-500">{product.category}</p>
        )}
      </div>

      {/* Rating */}
      <div className="mt-4">
        <label className="block text-sm text-gray-500 mb-1">Rating</label>
        <p className="text-gray-500">
          ⭐ {product.rating?.rate || 0} ({product.rating?.count || 0})
        </p>
      </div>

      {/* Buttons */}
      {isEditing && (
        <div className="flex gap-3 mt-6">
          <ActionButton variant="edit" onClick={handleSave}>
            Save
          </ActionButton>
          <button
            onClick={handleCancel}
            className="px-3 py-1 rounded border text-sm"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
