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
      <div className="bg-slate-100 min-h-screen">
        <Appbar />

        <div className="p-4 sm:p-8 flex flex-col sm:flex-row justify-around items-center sm:items-start text-black">
          <div className="border p-4 rounded-lg shadow-lg bg-white w-full sm:w-auto mb-4 sm:mb-0">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={450}
              height={450}
              className="w-full h-[40vh] sm:h-[60vh] object-contain rounded-md"
            />
          </div>
          
          <div className="w-full sm:w-1/2">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{product.name}</h1>
            <div className="text-lg sm:text-xl text-gray-500 mb-2">{product.category}</div>
            <div className="text-base sm:text-lg mb-4">{product.description}</div>
            <div className="text-xl sm:text-2xl font-bold mb-4">${product.price.toFixed(2)}</div>
            <AddToCartButton productId={product.id} />
          </div>
        </div>

        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch product", error);
    return <div>Error fetching product details</div>;
  }
}
