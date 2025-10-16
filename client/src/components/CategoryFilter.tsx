import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export type Category = "all" | "nature" | "architecture" | "people" | "abstract" | "urban" | "animals" | "food" | "travel";

interface CategoryFilterProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categories: { value: Category; label: string }[] = [
  { value: "all", label: "All Photos" },
  { value: "nature", label: "Nature" },
  { value: "architecture", label: "Architecture" },
  { value: "people", label: "People" },
  { value: "abstract", label: "Abstract" },
  { value: "urban", label: "Urban" },
  { value: "animals", label: "Animals" },
  { value: "food", label: "Food" },
  { value: "travel", label: "Travel" },
];

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="border-b bg-background" data-testid="filter-category">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollArea className="w-full">
          <div className="flex gap-2 py-4">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={activeCategory === category.value ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryChange(category.value)}
                className="whitespace-nowrap text-sm font-medium"
                data-testid={`button-category-${category.value}`}
              >
                {category.label}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
