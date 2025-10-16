import { useState } from "react";
import { Lightbox } from "../Lightbox";
import { Button } from "@/components/ui/button";

const sampleImages = [
  { id: 1, src: "https://picsum.photos/seed/1/1200/800", category: "Nature", title: "Mountain Vista", author: "Emma Johnson", resolution: "1920×1280" },
  { id: 2, src: "https://picsum.photos/seed/2/1200/800", category: "Architecture", title: "Glass Tower", author: "Michael Chen", resolution: "1920×1080" },
  { id: 3, src: "https://picsum.photos/seed/3/1200/800", category: "People", title: "Portrait Study", author: "Sarah Williams", resolution: "1200×1600" },
];

export default function LightboxExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState(new Set<number>([2]));

  const handleNavigate = (direction: "prev" | "next") => {
    if (direction === "prev" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === "next" && currentIndex < sampleImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleToggleFavorite = (id: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="p-8">
      <Button onClick={() => setIsOpen(true)}>Open Lightbox</Button>
      
      {isOpen && (
        <Lightbox
          images={sampleImages}
          currentIndex={currentIndex}
          favorites={favorites}
          onClose={() => setIsOpen(false)}
          onNavigate={handleNavigate}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </div>
  );
}
