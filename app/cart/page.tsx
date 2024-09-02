"use client";

import useCart from '@/app/context/CartContext';
import Appbar from '@/components/appbar';
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
    <div className="bg-white min-h-screen">
      <div>
        <Appbar />
      </div>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="text-black w-2/3 flex items-center rounded flex-col justify-center mx-auto p-4">
        <h1 className="text-3xl font-bold mt-4 mb-4">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-lg">Your cart is empty</p>
        ) : (
          <div className="gap-2 flex justify-center rounded-xl h-auto shadow-2xl w-full flex-col">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg gap-2 p-4 flex justify-center items-center"
              >
                <div className="flex gap-8 object-contain w-24 h-24">
                  <Image
                    src={item.product.imageUrl}
                    alt={`Product Image for ${item.productId}`}
                    width={96}
                    height={96}
                    className="object-contain rounded"
                  />
                </div>
                <div className="ml-4 flex-grow">
                  <p className="text-lg font-semibold">
                    {item.product.name}
                  </p>
                  <p className="text-sm">
                    Product ID: {item.productId}
                  </p>

                  <div className="flex gap-4 mt-2">
                    <p className="text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-gray-600">
                      Price: ${item.product.price * item.quantity}
                    </p>
                  </div>

                  <div className="mt-2">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="bg-slate-100 text-black font-semibold w-6 h-6 text-center rounded-full mr-2"
                      disabled={loading === item.id}
                    >
                      +
                    </button>

                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      className="bg-slate-100 text-black font-semibold w-6 h-6 rounded-full mr-8"
                      disabled={loading === item.id}
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="bg-slate-100 text-black w-28 rounded"
                      disabled={loading === item.id}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-center  mt-4 bg-gray-200 ">
              <p className="text-lg p-2 font-semibold">Total:  ${totalCost.toFixed(2)}</p>
            </div>
          </div>
        )}

        {cartItems.length > 0 && (
          <button onClick={() => {
            toast.error('Failed to checkout!')
          }} className="text-white bg-black p-2 mb-4 w-96 m-4 text-lg rounded-full">
            Proceed to Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default CartPage;
