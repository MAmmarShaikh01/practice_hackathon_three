import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

type prod = {
  _id: number;
  name: string;
  price: number;
  discountPercentage: number;
  tags: string[];
  imageUrl: string;
};

export default async function ProductGrid() {
  const query = await client.fetch(`*[_type == "product"]{
    _id,
    name,
    price,
    discountPercentage,
    tags,
    "imageUrl": image.asset->url
  }`);

  return (
    <div>
      {/* Top Section */}
      <header className="mb-8 flex flex-col sm:flex-row sm:justify-center items-center text-center gap-4 sm:gap-9 py-10">
        <h1 className="text-xl sm:text-lg text-[#151875] font-medium flex flex-col">
          Ecommerce Accessories & Fashion Item
          <span className="text-[#8A8FB9] text-sm text-left">
            About 9,620 results (0.62 seconds)
          </span>
        </h1>

        <div className="flex flex-wrap gap-4 sm:gap-8 mt-4 sm:mt-0 justify-center mb-5">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Per Page:</span>
            <input
              type="number"
              className="w-16 px-2 py-1 border"
              defaultValue={12}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort By:</span>
            <select className="px-2 py-1 border">
              <option>Best Match</option>
              <option>Price</option>
              <option>Latest</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">View:</span>
            <input
              type="number"
              className="w-16 px-2 py-1 border"
              defaultValue={12}
            />
          </div>
        </div>
      </header>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-10 my-20">
        {/* Render Products */}
        {query.map((product: prod) => (
          <div
            key={product._id} // Add the unique key prop here
            className="relative group overflow-hidden bg-white"
          >
            <div className="bg-[#F6F7FB] p-4 flex justify-center items-center">
              <Image
                src={urlFor(product.imageUrl).url() || ""}
                alt="Product 1"
                width={201}
                height={201}
                className="w-52 h-52 object-cover"
              />
            </div>
            <div className="bg-white p-4 flex flex-col justify-between h-24">
              <Link
                href=""
                className="text-lg font-bold text-[#151875] mb-1 truncate text-center"
              >
                {product.name}
              </Link>
              <div className="flex space-x-1 justify-center">
                <span className="w-[10px] h-[10px] rounded-full bg-[#DE9034]"></span>
                <span className="w-[10px] h-[10px] rounded-full bg-[#EC42A2]"></span>
                <span className="w-[10px] h-[10px] rounded-full bg-[#8568FF]"></span>
              </div>
              <div className="flex items-center gap-2 text-sm text-center justify-center">
                <span className="text-[#151875] text-sm">${product.price}</span>
                <span className="text-[#FB2E86] line-through text-sm">
                  $42.00
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center mb-20">
        <Image src="/27.png" width={904} height={93} alt="images" />
      </div>
    </div>
  );
}
