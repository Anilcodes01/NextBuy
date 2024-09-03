

import AddToCartButton from "@/components/addToCartBtn";
import Appbar from "@/components/appbar";
import Footer from "@/components/Footer";
import prisma from "@/app/lib/prisma";
import Image from "next/image";
import { notFound } from 'next/navigation';


interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category?: string;
}

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  
  try {
    const product = await prisma.product.findUnique({
      where: { id: id as string },
    });

    if (!product) {
      notFound(); 
    }

    return (
     <div className="bg-white min-h-screen">
      <div>
        <Appbar />
      </div>
      <div className="p-8  flex justify-around text-black">
        <div className="border p-4 rounded-lg shadow-lg bg-white">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={450}
            height={48}
            className="h-[60vh] w-full  p-2 rounded object-contain rounded-md mb-"
          />
         
        </div>
        <div className="w-1/2">
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="text-xl text-gray-500 mb-2">{product.category}</div>
          <div className="text-lg mb-4">{product.description}</div>
          <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>
          <AddToCartButton productId={product.id} />
        </div>
      </div>
      <div>
        <Footer />
      </div>
     </div>
    );
  } catch (error) {
    console.error("Failed to fetch product", error);
    return <div>Error fetching product details</div>;
  }
}
