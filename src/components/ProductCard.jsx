// ProductCard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../services/products.service";
import ActionButton from "../components/common/ActionButton";
import toast from "react-hot-toast";
import GenericModal from "../components/common/GenericModal";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // 🔹 Mutation للحذف
  const deleteMutation = useMutation({
    mutationFn: () => deleteProduct(product.id),
    onSuccess: () => {
      // تحديث الكاش بعد الحذف
      queryClient.setQueryData(["products"], (old) =>
        old.filter((p) => p.id !== product.id)
      );
      toast.success("Product deleted successfully!");
      setShowConfirm(false);
    },
    onError: () => {
      toast.error("Failed to delete product.");
      setShowConfirm(false);
    },
  });

  const handleDelete = () => {
    setIsDeleting(true);
    deleteMutation.mutate();
    setIsDeleting(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col h-full">
      {/* 🖼 Image */}
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-contain rounded-md"
      />

      {/* 📄 Content */}
      <div className="flex flex-col flex-1 mt-3">
        {/* 🏷 Title */}
        <h2 className="text-lg font-semibold line-clamp-2 min-h-[56px]">
          {product.title}
        </h2>

        {/* 💰 Price */}
        <p className="text-indigo-600 font-bold mt-2 text-lg">
          ${product.price}
        </p>

        {/* ⭐ Rating */}
        <p className="text-sm text-gray-500 mt-1">
          ⭐ {product.rating?.rate ?? 0} ({product.rating?.count ?? 0})
        </p>

        {/* 🔘 Buttons */}
        <div className="mt-auto flex gap-2">
          <button
            onClick={() => navigate(`/dashboard/products/${product.id}`)}
            className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500 transition"
          >
            View Product
          </button>

          <ActionButton variant="delete" onClick={() => setShowConfirm(true)}>
            Delete
          </ActionButton>
        </div>
      </div>

      {/* 🔴 Confirm Modal */}
      {showConfirm && (
        <GenericModal
          title="Delete Product"
          onClose={() => setShowConfirm(false)}
        >
          <p className="mb-4 text-center text-lg">
            Are you sure you want to delete "{product.title}"?
          </p>
          <div className="flex justify-center gap-4">
            <ActionButton variant="delete" onClick={handleDelete}>
              {isDeleting ? "Deleting..." : "Yes, Delete"}
            </ActionButton>
            <button
              onClick={() => setShowConfirm(false)}
              className="px-3 py-1 rounded border text-sm"
            >
              Cancel
            </button>
          </div>
        </GenericModal>
      )}
    </div>
  );
};

export default ProductCard;
