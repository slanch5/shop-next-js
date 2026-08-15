"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const categories = [
  { label: "All", value: "" },
  { label: "Whiskey", value: "whiskey" },
  { label: "Vodka", value: "vodka" },
];

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "";

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="flex gap-x-4 mb-8">
      {categories.map((cat) => (
        <Button
          key={cat.value}
          variant={activeCategory === cat.value ? "default" : "outline"}
          onClick={() => handleCategoryChange(cat.value)}
          className="capitalize"
        >
          {cat.label}
        </Button>
      ))}
    </div>
  );
}
