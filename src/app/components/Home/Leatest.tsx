import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";

type prod = {
  _id: number;
  name: string;
  price: number;
  discountPercentage: number;
  tags: string[];
  imageUrl: string;
};

export default async function Home() {
  const query = await client.fetch(`*[_type == "product"]{
    _id,
    name,
    price,
    discountPercentage,
    tags,
    "imageUrl": image.asset->url
  }`);

  const products: prod[] = query.slice(4, 7);

  return (
    <div className="container mx-auto px-4 py-8" style={{ backgroundColor: "white" }}>
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#151875]">Latest Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
        {products.map((product) => (
          <div
            key={product._id} // Add key prop here
            className="border rounded-lg shadow-md p-4 bg-[#f7f7f7]"
          >
            <div className="w-360 h-270 mx-auto">
              <Image
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-[300px] rounded-t-lg mb-4"
                width={300}
                height={400}
              />
            </div>
            <div className="bg-white p-4 rounded-b-lg">
              <Link href={`/products/${product._id}`}>
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              </Link>
              <div className="flex items-center">
                <span className="text-pink-500 font-bold mr-2">${product.price}</span>
                <span className="text-gray-400 line-through">$65.00</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
