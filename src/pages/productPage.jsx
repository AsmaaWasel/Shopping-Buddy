// Products.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../services/products.service";
import ProductsList from "../components/ProductsList";

const Products = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching products</div>;

  // ⚡ هنا بنمرر البيانات للـ ProductsList
  return <ProductsList products={data} />;
};

export default Products;
