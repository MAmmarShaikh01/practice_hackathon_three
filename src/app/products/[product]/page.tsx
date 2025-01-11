"use client";
import React from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

type prod = {
  _id: number;
  name: string;
  price: number;
  discountPercentage: number;
  tags: string[];
  imageUrl: string;
  description: string;
};

const page = async ({ params }: { params: { product: number } }) => {
  const query = await client.fetch(`*[_type == "product"]{
      _id,
      name,
      price,
      discountPercentage,
      tags,
      "imageUrl": image.asset->url,
      description
  }`);
  let mn = query.filter((item: prod) => item._id == params.product);

  // Add to Cart function
  const addToCart = (id: number) => {
    // Retrieve existing cart items from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cartItems") || "[]");

    // Check if item already exists in the cart
    if (!existingCart.includes(id)) {
      existingCart.push(id);
      console.log(existingCart);
      localStorage.setItem("cartItems", JSON.stringify(existingCart));
      alert("Item added to cart!");
    } else {
      alert("Item already in the cart.");
    }
  };

  return (
    <>
      {/* Header Section */}
      <header className="text-center flex justify-center items-center bg-gradient-to-r from-[#F6F5FF] to-[#EAE8FF] mb-12 h-32 sm:h-[286px]">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#151875]">Product Details</h1>
      </header>

      {/* Product Details Section */}
      <div className="flex flex-col md:flex-row w-[90%] max-w-[1200px] my-16 gap-6 md:gap-10 mx-auto shadow-lg rounded-lg overflow-hidden bg-white p-6">
        {/* Product Image */}
        <div className="flex justify-center items-center w-full md:w-1/2">
          <Image
            src={urlFor(mn[0].imageUrl).url()}
            alt="product"
            width={500}
            height={500}
            className="w-full max-w-[400px] h-auto rounded-lg object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col w-full md:w-1/2 gap-6 justify-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#151875]">{mn[0].name}</h1>
          <p className="text-[#555555] text-sm sm:text-base leading-relaxed">
            {mn[0].description}
          </p>
          <p className="text-lg sm:text-xl font-semibold text-[#151875]">
            Price: ${mn[0].price}
          </p>
          <button
            className="px-4 sm:px-6 py-2 sm:py-3 bg-[#FB2E86] text-white text-sm sm:text-lg rounded-lg hover:bg-[#FB2f98] transition duration-300"
            onClick={() => addToCart(mn[0]._id)} // Call the function with the product ID
          >
            Add to Cart
          </button>
        </div>
      </div>

    </>
  );
};

export default page;
