"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import CategoryFilter from "./CategoryFilter";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category?: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const router = useRouter(); // For navigation

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/fetchProducts");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setProducts(data.products);  // Store all products
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let displayedProducts = products;

    // Filter products by category
    if (selectedCategory) {
      displayedProducts = displayedProducts.filter(p => p.category === selectedCategory);
    }

    // Limit the number of displayed products to 8
    setFilteredProducts(displayedProducts.slice(0, 8));
  }, [products, selectedCategory]);

  const handleCardClick = (id: string) => {
    router.push(`/Item/${id}`);
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="text-black">
      <CategoryFilter onSelectCategory={setSelectedCategory} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => handleCardClick(product.id)}
            className="border cursor-pointer p-4 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-200"
          >
            <Image
            width={150}
            height={150}
              src={product.imageUrl}
              alt={product.name}
              className="h-48 w-full object-contain rounded-md mb-4"
            />
            <div className="text-lg font-semibold">{product.name}</div>
            <div className="text-gray-500 mb-2">{product.category}</div>
            <div className="text-md mb-2">
              {product.description.length > 150
                ? `${product.description.substring(0, 150)}...`
                : product.description}
            </div>
            <div className="text-xl font-bold mb-2">${product.price.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
