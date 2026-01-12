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

  // 🔹 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // 🔹 Search & Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // 🔹 Modal & Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  // 🔹 Fetch products
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  // 🔹 Search + Filter logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // 🔹 Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // 🔹 Create product
  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (newProduct) => {
      const productWithRating = {
        ...newProduct,
        rating: { rate: 0, count: 0 },
      };

      queryClient.setQueryData(["products"], (old = []) => [
        productWithRating,
        ...old,
      ]);

      setIsModalOpen(false);
      setCurrentPage(1);
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
    <div className="p-6">
      {/* 🔹 Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="border p-2 rounded w-full md:w-1/3"
        />

        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1);
          }}
          className="border p-2 rounded w-full md:w-1/4"
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men</option>
          <option value="women's clothing">Women</option>
        </select>
      </div>

      {/* 🔹 Add Button */}
      <div className="flex justify-end mb-6">
        <AddButton label="Add Product" onClick={() => setIsModalOpen(true)} />
      </div>

      {/* 🔹 Products Grid */}
      {paginatedProducts.length > 0 ? (
        <ProductsList products={paginatedProducts} />
      ) : (
        <p className="text-center text-gray-500 mt-10">No products found</p>
      )}

      {/* 🔹 Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? "bg-indigo-600 text-white" : "border"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

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
