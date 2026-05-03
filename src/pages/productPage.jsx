import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllProducts, createProduct } from "../services/products.service";
import ProductsList from "../components/ProductsList";
import SplashLoader from "../components/common/SplashLoader";
import AddButton from "../components/common/AddButton";
import GenericModal from "../components/common/GenericModal";
import ProductForm from "../components/products/ProductForm";
import toast from "react-hot-toast";

const Products = () => {
  const queryClient = useQueryClient();

  // 🔹 State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  // 🔹 Fetch Products
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  // 🔹 Mutation لإنشاء منتج جديد
  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (newProduct) => {
      const productWithRating = {
        ...newProduct,
        rating: {
          rate: 0,
          count: 0,
        },
      };

      queryClient.setQueryData(["products"], (old) => {
        return old ? [productWithRating, ...old] : [productWithRating];
      });

      setIsModalOpen(false);
      toast.success("Product added successfully!");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  if (isLoading) return <SplashLoader />;
  if (error) return <div>Error fetching products</div>;

  return (
    <div className="p-8">
      {/* 🔹 Top bar */}
      <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-semibold">Products</h1>
      <AddButton label="Add Product" onClick={() => setIsModalOpen(true)} />
      </div>

      {/* 🔹 Products Grid */}
      <ProductsList products={data} />

      {/* 🔹 Modal */}
      {isModalOpen && (
        <GenericModal
          title="Add New Product"
          onClose={() => setIsModalOpen(false)}
        >
          <ProductForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            isLoading={createMutation.isLoading}
          />
        </GenericModal>
      )}
    </div>
  );
};

export default Products;
