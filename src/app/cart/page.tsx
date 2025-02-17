'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

interface CartItem {
  _id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  quantity: number; // Assuming quantity is also needed
}

// Utility function to truncate description
const truncateDescription = (description: string, wordLimit: number): string => {
  const words = description.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + " ...";
  }
  return description;
};

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const storedIds = JSON.parse(localStorage.getItem("cartItems") || "[]");

        if (storedIds.length === 0) {
          setCartItems([]);
          return;
        }

        const products: CartItem[] = await client.fetch(`*[_type == "product"]{
          _id,
          name,
          price,
          "imageUrl": image.asset->url,
          description
        }`);

        const filteredItems = products
          .filter((product) => storedIds.includes(product._id))
          .map((product) => ({ ...product, quantity: 1 }));

        setCartItems(filteredItems);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const updateQuantity = (_id: number, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === _id
          ? { ...item, quantity: newQuantity > 0 ? newQuantity : 1 }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  const resetCart = () => {
    const fetchCartItems = async () => {
      try {
        const storedIds = JSON.parse(localStorage.getItem("cartItems") || "[]");

        if (storedIds.length === 0) {
          setCartItems([]);
          return;
        }

        const products: CartItem[] = await client.fetch(`*[_type == "product"]{
          _id,
          name,
          price,
          "imageUrl": image.asset->url,
          description
        }`);

        const filteredItems = products
          .filter((product) => storedIds.includes(product._id))
          .map((product) => ({ ...product, quantity: 1 }));

        setCartItems(filteredItems);
      } catch (error) {
        console.error("Failed to reset cart:", error);
      }
    };

    fetchCartItems();
  };

  return (
    <>
      <div className="p-6 lg:p-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6 text-[#1D3178]">Your Cart</h2>
          {cartItems.length > 0 ? (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md flex-col md:flex-row"
                >
                  <div className="flex items-center space-x-4">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-semibold text-[#1D3178]">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {truncateDescription(item.description, 10)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <p className="text-[#1D3178]">${item.price.toFixed(2)}</p>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item._id, Number(e.target.value))
                      }
                      className="w-12 px-2 py-1 border rounded-md text-center"
                      min="1"
                    />
                    <p className="font-bold text-[#1D3178]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#1D3178] text-center mt-6">
              Your cart is empty. Add some products!
            </p>
          )}

          <div className="flex justify-between mt-6">
            <button
              onClick={resetCart}
              className="px-4 py-2 bg-[#FB2E86] text-white rounded-md text-sm hover:bg-pink-600"
            >
              Update Cart
            </button>
            <button
              onClick={clearCart}
              className="px-4 py-2 bg-[#FB2E86] text-white rounded-md text-sm hover:bg-pink-600"
            >
              Clear Cart
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-[#1D3178]">Cart Totals</h2>
          <p className="flex justify-between text-[#1D3178]">
            <span>Subtotal:</span> <span>${calculateTotal().toFixed(2)}</span>
          </p>
          <p className="flex justify-between mb-4 text-[#1D3178]">
            <span>Shipping:</span> <span>$15.00</span>
          </p>
          <p className="flex justify-between font-bold text-lg text-[#1D3178]">
            <span>Total:</span>{" "}
            <span>${(calculateTotal() + 15).toFixed(2)}</span>
          </p>
          <li>
            <Link href="/checkout">
              <button
                type="submit"
                className="w-full py-3 bg-[#FB2E86] text-white rounded-md font-semibold hover:bg-pink-600"
              >
                Proceed To Checkout
              </button>
            </Link>
          </li>
        </div>
      </div>
    </>
  );
};

export default Cart;
