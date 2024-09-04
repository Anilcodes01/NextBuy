"use client";
import Appbar from "@/components/appbar";
import ProductList from "../components/ProductCard";
import Image from "next/image";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  return (
    <div className="bg-slate-100">
      <div>
        <Appbar />
      </div>
      <div className="p-5">
        <div className="flex flex-col md:flex-row justify-around rounded-lg shadow-2xl p-8 md:h-[70vh] h-auto items-center">
          <div className="text-center md:text-left">
            <div className="text-black text-2xl md:text-4xl font-bold">Discover Our</div>
            <div className="text-black text-2xl md:text-4xl font-bold">
              Curated Collection
            </div>
            <div className="text-black mt-2 text-sm">
              Explore our carefully selected products for your home and lifestyle.
            </div>
            <button
              onClick={() => {
                router.push("/allproducts");
              }}
              className="bg-black w-24 outline-none text-white rounded-full text-sm mt-4 md:mt-2 p-2"
            >
              Shop Now
            </button>
          </div>
          <div className="flex justify-center items-center p-5 mt-6 md:mt-0">
            <Image
              src={"https://m.media-amazon.com/images/I/71IzhQv+-cL.jpg"}
              alt="The brewster mug"
              width={350}
              height={350}
              className="rounded"
            />
          </div>
        </div>
      </div>
      <div className="flex text-black justify-between">
        <div className="text-black ml-4 mt-4 font-bold text-2xl">
          | Top Picks
        </div>
      </div>
      <ProductList />
      <div>
        <Footer />
      </div>
    </div>
  );
}
