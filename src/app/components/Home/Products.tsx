import { client } from "@/sanity/lib/client";
import Link from "next/link";

type prod = {
  _id: number;
  name: string;
  price: number;
  discountPercentage: number;
  tags: string[];
  imageUrl: string;
};

const ProductGrid = async () => {
  const query = await client.fetch(`*[_type == "product"]{
    _id,
    name,
    price,
    discountPercentage,
    tags,
    "imageUrl": image.asset->url
  }`);

  const products = query.slice(0, 4);

  return (
    <div className="bg-gray-50 py-12">
      <h2 className="text-4xl font-bold text-center mb-8 text-[#1A0B5B]">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {products.map((product: prod) => (
          <Link key={product._id} href={`/products/${product._id}`}>
            <div className="group relative p-4 hover:bg-[#4c35ff] hover:text-white rounded-lg shadow hover:shadow-lg transition">
              <div
                className="flex items-center justify-center h-64 bg-[#F6F7FB] bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${product.imageUrl})`,
                }}
              ></div>
              <div className="absolute top-0 left-0 w-full h-full hover:text-white flex items-center justify-center group-hover:border-[#1A0B5B] border-2"></div>
              <div className="mt-4 text-center hover:text-white">
                <h3 className="text-lg font-medium cursor-pointer">{product.name}</h3>
                <p className="text-sm text-gray-600 hover:text-white">Code - {product._id}</p>
                <p className="text-lg font-bold text-gray-900 hover:text-white">{product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
