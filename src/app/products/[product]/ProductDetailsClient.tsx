"use client";

import React from "react";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
};

const ProductDetailsClient = ({ product }: { product: Product }) => {
  // Add to Cart function
  const addToCart = (id: number) => {
    try {
      const existingCart = JSON.parse(localStorage.getItem("cartItems") || "[]");
      if (!existingCart.includes(id)) {
        existingCart.push(id);
        localStorage.setItem("cartItems", JSON.stringify(existingCart));
        alert("Item added to cart!");
      } else {
        alert("Item already in the cart.");
      }
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  return (
    <div>
      {/* Header Section */}
      <header className="text-center flex justify-center items-center bg-gradient-to-r from-[#F6F5FF] to-[#EAE8FF] mb-12 h-32 sm:h-[286px]">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#151875]">Product Details</h1>
      </header>

      {/* Product Details Section */}
      <div className="flex flex-col md:flex-row w-[90%] max-w-[1200px] my-16 gap-6 md:gap-10 mx-auto shadow-lg rounded-lg overflow-hidden bg-white p-6">
        {/* Product Image */}
        <div className="flex justify-center items-center w-full md:w-1/2">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={500}
            height={500}
            className="w-full max-w-[400px] h-auto rounded-lg object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col w-full md:w-1/2 gap-6 justify-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#151875]">{product.name}</h1>
          <p className="text-[#555555] text-sm sm:text-base leading-relaxed">
            {product.description}
          </p>
          <p className="text-lg sm:text-xl font-semibold text-[#151875]">
            Price: ${product.price}
          </p>
          <button
            className="px-4 sm:px-6 py-2 sm:py-3 bg-[#FB2E86] text-white text-sm sm:text-lg rounded-lg hover:bg-[#FB2f98] transition duration-300"
            onClick={() => addToCart(product.id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsClient;
