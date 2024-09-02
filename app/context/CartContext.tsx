'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface CartItem {
  id: string;

  productId: string;
  quantity: number;
  product: {
    imageUrl: string;
    name: string;
    price: number
  };
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateCartItem: (itemId: string, quantity: number) => void;
  removeCartItem: (itemId: string) => void;
  fetchCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: any) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const fetchCart = async () => {
    try {
      const { data } = await axios.get('/api/cart');
      if (Array.isArray(data.cart)) { 
        setCartItems(data.cart);
      } else {
        console.error('Unexpected data format:', data);
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error fetching cart', error);
    }
  };

  const addToCart = async (productId: string, quantity: number) => {
    try {
      await axios.post('/api/cart/add', { productId, quantity });
      fetchCart();
    } catch (error) {
      console.error('Error adding to cart', error);
    }
  };

  const updateCartItem = async (itemId: string, quantity: number) => {
    try {
      await axios.put(`/api/cart/update/${itemId}`, { quantity });
      setCartItems(prevItems =>
        prevItems.map(item => 
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating cart item', error);
    }
  };

  const removeCartItem = async (itemId: string) => {
    try {
      await axios.delete(`/api/cart/remove/${itemId}`);
      fetchCart();
    } catch (error) {
      console.error('Error removing cart item', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateCartItem, removeCartItem, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default function useCart()  {
  console.log('usecart hook called')
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
