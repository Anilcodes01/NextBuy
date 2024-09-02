
"use client";

import { useEffect, useState } from "react";

interface CategoryFilterProps {
  onSelectCategory: (category: string | null) => void;
}

export default function CategoryFilter({ onSelectCategory }: CategoryFilterProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await res.json();
        setCategories(data.categories);
      } catch (error: any) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category === "all" ? null : category);
    onSelectCategory(category === "all" ? null : category);
  };

  return (
    <div className="mb-4 w-full mt-4  ml-4">
      <select
        value={selectedCategory ?? "all"}
        onChange={handleCategoryChange}
        className="p-2 border outline-none cursor-pointer  rounded "
      >
        <option className="cursor-pointer" value="all">All Categories</option>
        {categories.map(category => (
          <option className="cursor-pointer" key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
