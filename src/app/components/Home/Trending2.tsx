import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";


type prod = {
  _id: number;
  name: string;
  price: number;
  discountPercentage: number;
  tags: string[];
  imageUrl: string;
};

export default async function TrendingProducts() {

  const query = await client.fetch(`*[_type == "product"]{
    _id,
    name,
    price,
    discountPercentage,
    tags,
    "imageUrl": image.asset->url
  }`);
  const product = query.slice(7,11)
  const product2 = query.slice(11,14)
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Trending Products</h1>
      
      {/* Trending Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {product.map((item:prod) => (
          <div
            key={item._id}
            className="bg-white border rounded-lg shadow-md overflow-hidden p-4"
          >
            <div className="aspect-square relative bg-gray-100 rounded-lg mb-3">
              <Image
                src={item.imageUrl}
                alt={`Cantilever chair ${item._id}`}
                fill
                className="object-cover"
              />
            </div>
            <Link href={`/product/${item._id}`}>
            <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-black">${item.price}</span>
              <span className="text-gray-400 line-through">$42.00</span>
            </div>
          </div>
        ))}
      </div>

      {/* Promo Section */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-8">
        {/* Left Promo */}
        <div className="md:col-span-3 bg-[#FFF6FB] rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#151875]">23% off in all products</h3>
              <button className="text-[#FB2E86]">
                <Link href = "../ShopGrid">
                Shop Now
                </Link>
                </button>
            </div>
            {/* Set image 20 here */}
            <div className="relative w-[213px] h-[207px]">
              <Image
                src="/20.png"
                alt="Kitchen mitt"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Center Promo */}
        <div className="md:col-span-3 bg-[#F6F7FB] rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#151875]">23% off in all products</h3>
              <Link href = "../ShopGrid" className="text-[#FB2E86]">View Products</Link>
            </div>
            {/* Set image 21 here */}
            <div className="relative w-[312px] h-[207px]">
              <Image
                src="/21.png"
                alt="Kitchen mitt"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="md:col-span-1 text-[#151875]">
  <div className="space-y-4">
    {product2.map((item:prod) => (
      <div key={item._id} className="flex items-center gap-2">
        <div className="relative w-12 h-12 bg-gray-100 rounded">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover rounded"
          />
        </div>
        <div>
          <h4 className="text-sm font-medium">
            <Link href={`/products/${item._id}`}>
            {item.name}
            </Link>
            </h4>
          <span className="text-sm text-[#151875] line-through">${item.price}</span>
        </div>
      </div>
    ))}
  </div>
</div>

      </div>
    </div>
  );
}
