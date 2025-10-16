import { useState } from "react";
import { CategoryFilter, type Category } from "../CategoryFilter";

export default function CategoryFilterExample() {
  const [category, setCategory] = useState<Category>("all");

  return <CategoryFilter activeCategory={category} onCategoryChange={setCategory} />;
}
