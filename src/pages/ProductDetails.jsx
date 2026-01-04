import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../services/products.service";

const ProductDetails = () => {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  // ✅ اعمل لوج لما الداتا تتغير
  useEffect(() => {
    if (product) {
      console.log("Product details:", product);
    }
  }, [product]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow mt-6">
      <h1>product details</h1>
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-96 object-contain rounded-md"
      />
      <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
      <p className="text-indigo-600 font-semibold mt-2 text-xl">
        ${product.price}
      </p>
      <p className="mt-2 text-gray-700">{product.description}</p>
      <p className="mt-2 text-gray-500">Category: {product.category}</p>
      <p className="mt-2 text-gray-500">
        Rating: ⭐ {product.rating.rate} ({product.rating.count})
      </p>
    </div>
  );
};

export default ProductDetails;
