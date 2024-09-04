"use client";

import useCart from '@/app/context/CartContext';
import Appbar from '@/components/appbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import { toast, Toaster } from "react-hot-toast";

const CartPage = () => {
  const { cartItems, updateCartItem, removeCartItem } = useCart();
  const [loading, setLoading] = useState<string | null>(null);

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) {
      toast.error('Quantity cannot be less than 1, Please remove the Item.');
      return;
    }
    
    setLoading(itemId);
    try {
      await updateCartItem(itemId, quantity);
    } catch (error) {
      console.error('Error updating cart item', error);
    } finally {
      setLoading(null);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    console.log("Remove clicked!");
    setLoading(itemId);
    try {
      await removeCartItem(itemId);
    } catch (error) {
      console.error('Error removing cart item', error);
    } finally {
      setLoading(null);
    }
  };

  const totalCost = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  }, [cartItems]);

  return (
    <div className="bg-slate-100 min-h-screen">
      <Appbar />
      <Toaster position="top-right" reverseOrder={false} />
      <div className="text-black w-full sm:w-2/3 flex flex-col items-center justify-center mx-auto p-4">
        <h1 className="text-2xl sm:text-3xl font-bold mt-4 mb-4">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-lg">Your cart is empty</p>
        ) : (
          <div className="flex flex-col  gap-4 w-full">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg gap-2 p-4 flex flex-col sm:flex-row items-center shadow-md"
              >
                <div className="w-full sm:w-24 h-24">
                  <Image
                    src={item.product.imageUrl}
                    alt={`Product Image for ${item.productId}`}
                    width={96}
                    height={96}
                    className="object-contain h-full rounded"
                  />
                </div>
                <div className="flex flex-col sm:ml-4 w-full">
                  <p className="text-lg font-semibold mt-5 md:mt-0 text-left sm:text-left">
                    {item.product.name}
                  </p>
                  <p className="text-sm text-left sm:text-left">
                    Product ID: {item.productId}
                  </p>
                  <div className="flex justify-between sm:justify-start gap-4 mt-2 text-left sm:text-left">
                    <p className="text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-gray-600">
                      Price: ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-center  sm:justify-start gap-4 mt-4">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="bg-slate-100 text-black font-semibold w-6 h-6 text-center rounded-full"
                      disabled={loading === item.id}
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      className="bg-slate-100 text-black font-semibold w-6 h-6 text-center rounded-full"
                      disabled={loading === item.id}
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="bg-slate-100 text-black w-20 sm:w-28 rounded"
                      disabled={loading === item.id}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-center mt-4 bg-gray-200 rounded-lg p-4">
              <p className="text-lg font-semibold">Total: ${totalCost.toFixed(2)}</p>
            </div>
          </div>
        )}

        {cartItems.length > 0 && (
          <button
            onClick={() => {
              toast.error('Failed to checkout!');
            }}
            className="text-white bg-black p-2 mb-4 w-full sm:w-96 text-lg rounded-full mt-4"
          >
            Proceed to Checkout
          </button>
        )}
      </div>
      
    </div>
  );
};

export default CartPage;
