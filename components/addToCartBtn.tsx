"use client";
import { useRouter } from "next/navigation";
import useCart from "../app/context/CartContext";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";

const AddToCartButton = ({ productId }: { productId: string }) => {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
 const {data: session} = useSession();

  const handleAddToCart = async () => {
    if(!session) {
      toast.error("Please signin first to add items to your cart!");
     
    }
    
    if (!productId) {
      console.error("No productId provided");
      return;
    }
    setLoading(true);
    try {
      await addToCart(productId, 1);
      
      router.push('/cart')
    } catch (error) {
      console.error("Error adding to cart", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
<button
      onClick={handleAddToCart}
      disabled={loading}
      className="bg-black text-white rounded-full p-2 w-full mt-4"
    >
      {loading ? "Adding..." : "Add to Cart"}
    </button>
    
    <Toaster position="top-right" reverseOrder={false} />
    </div>
    

  );
};

export default AddToCartButton;
