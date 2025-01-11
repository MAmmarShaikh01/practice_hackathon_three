import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import ProductDetailsClient from "./ProductDetailsClient";


type prod = {
  _id: number;
  name: string;
  price: number;
  discountPercentage: number;
  tags: string[];
  imageUrl: string;
  description: string;
};

export default async function Page({ params }: { params: { product: number } }) {
  // Fetch product data on the server
  const query = await client.fetch(`*[_type == "product"]{
    _id,
    name,
    price,
    discountPercentage,
    tags,
    "imageUrl": image.asset->url,
    description
  }`);
  const product = query.find((item: prod) => item._id === params.product);

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <ProductDetailsClient
      product={{
        id: product._id,
        name: product.name,
        price: product.price,
        description: product.description,
        imageUrl: urlFor(product.imageUrl).url(),
      }}
    />
  );
}
