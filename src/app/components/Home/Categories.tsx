import Image from "next/image";
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

export default async function TopCategories() {

  const query = await client.fetch(`*[_type == "product"]{
    _id,
    name,
    price,
    discountPercentage,
    tags,
    "imageUrl": image.asset->url
  }`);

  const product = query.slice(14,18)

  return (

    <section className="px-4 py-8 lg:py-16 bg-white">
      <h2 className="text-center text-2xl lg:text-3xl font-bold text-blue-900 mb-8">
        Top Categories
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
    
    {
      product.map((pr:prod)=>(
        <div className="relative flex flex-col items-center text-center space-y-2">
          <div className="w-32 h-32 rounded-full border-4 border-purple-500 flex items-center justify-center relative">
            <Image
              src={pr.imageUrl} 
              alt="Mini LCW Chair"
              width={80}
              height={20}
              className="object-contain rounded-full"
            />
            <button className="absolute bottom-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
              View Shop
            </button>
          </div>
          <h3 className="text-sm font-medium">
            <Link href={`/product/${pr._id}`}>
              {pr.name}
              </Link>
            {pr.name}</h3>
          <p className="text-sm font-semibold text-gray-600">${pr.price}</p>
        </div>
      ))
    }

      </div>
    </section>
  );
}