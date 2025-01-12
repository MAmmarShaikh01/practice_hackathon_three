'use client';

import { useRouter } from "next/navigation"; // Use this for navigation
import React, { useState, useEffect } from "react";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  paymentMethod: string;
}

const CheckoutPage = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "creditCard",
  });

  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const isValid =
      formData.fullName.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.address.trim() !== "" &&
      formData.city.trim() !== "" &&
      formData.postalCode.trim() !== "" &&
      formData.country.trim() !== "";

    setIsFormValid(isValid);
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isFormValid) {
      alert("Order Placed Successfully!");
      router.push("/ordercompleted"); // Navigate to the order completed page
    } else {
      alert("Please fill in all the required fields correctly.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 lg:p-12">
          <h1 className="text-3xl font-bold text-center text-[#1D3178] mb-8">Billing Information</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700">
                Full Name
              </label>
              <input
                required
                pattern=".{3,20}"
                title="Enter at least 3 and at most 20 characters"
                type="text"
                name="fullName"
                id="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="mt-2 block w-full p-3 border rounded-md focus:ring focus:ring-pink-500 focus:outline-none"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                required
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-2 block w-full p-3 border rounded-md focus:ring focus:ring-pink-500 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                Phone
              </label>
              <input
                required
                type="tel"
                pattern="^\d{11,13}$"
                title="Enter a valid phone number"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-2 block w-full p-3 border rounded-md focus:ring focus:ring-pink-500 focus:outline-none"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-semibold text-gray-700">
                Address
              </label>
              <input
                required
                pattern=".{3,20}"
                title="Enter at least 15 characters"
                type="text"
                name="address"
                id="address"
                value={formData.address}
                onChange={handleInputChange}
                className="mt-2 block w-full p-3 border rounded-md focus:ring focus:ring-pink-500 focus:outline-none"
                placeholder="Enter your address"
              />
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-semibold text-gray-700">
                City
              </label>
              <input
                required
                type="text"
                name="city"
                pattern="^[a-zA-Z0-9]{3,}$"
                id="city"
                value={formData.city}
                onChange={handleInputChange}
                className="mt-2 block w-full p-3 border rounded-md focus:ring focus:ring-pink-500 focus:outline-none"
                placeholder="Enter your city"
              />
            </div>

            <div>
              <label htmlFor="postalCode" className="block text-sm font-semibold text-gray-700">
                Postal Code
              </label>
              <input
                required
                type="text"
                name="postalCode"
                id="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                className="mt-2 block w-full p-3 border rounded-md focus:ring focus:ring-pink-500 focus:outline-none"
                placeholder="Enter your postal code"
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-semibold text-gray-700">
                Country
              </label>
              <input
                required
                type="text"
                name="country"
                id="country"
                value={formData.country}
                onChange={handleInputChange}
                className="mt-2 block w-full p-3 border rounded-md focus:ring focus:ring-pink-500 focus:outline-none"
                placeholder="Enter your country"
              />
            </div>

            <div>
              <label htmlFor="paymentMethod" className="block text-sm font-semibold text-gray-700">
                Payment Method
              </label>
              <select
                name="paymentMethod"
                id="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className="mt-2 block w-full p-3 border rounded-md focus:ring focus:ring-pink-500 focus:outline-none"
                required
              >
                <option value="creditCard">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="cash">Cash on Delivery</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-3 text-white rounded-md font-semibold ${
                isFormValid ? "bg-[#FB2E86] hover:bg-pink-600" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
