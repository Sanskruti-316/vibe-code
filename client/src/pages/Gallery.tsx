import { useState, useMemo } from "react";
import { GalleryHeader } from "@/components/GalleryHeader";
import { CategoryFilter, type Category } from "@/components/CategoryFilter";
import { MasonryGallery } from "@/components/MasonryGallery";
import { Lightbox } from "@/components/Lightbox";

const aspectRatios = [0.67, 0.75, 0.8, 1, 1.2, 1.33, 1.5];

const categoryImages = {
  nature: [
    { id: 1001, seed: "forest-mountain-1", aspectRatio: 0.75 },
    { id: 1002, seed: "sunset-ocean-2", aspectRatio: 1.33 },
    { id: 1003, seed: "green-leaves-3", aspectRatio: 0.8 },
    { id: 1004, seed: "waterfall-4", aspectRatio: 0.67 },
    { id: 1005, seed: "landscape-5", aspectRatio: 1.5 },
    { id: 1006, seed: "flowers-garden-6", aspectRatio: 1 },
    { id: 1007, seed: "mountain-peak-7", aspectRatio: 0.75 },
  ],
  architecture: [
    { id: 2001, seed: "modern-building-1", aspectRatio: 0.67 },
    { id: 2002, seed: "skyscraper-2", aspectRatio: 0.75 },
    { id: 2003, seed: "bridge-structure-3", aspectRatio: 1.5 },
    { id: 2004, seed: "interior-design-4", aspectRatio: 1.33 },
    { id: 2005, seed: "city-architecture-5", aspectRatio: 1 },
    { id: 2006, seed: "historic-building-6", aspectRatio: 0.8 },
    { id: 2007, seed: "glass-facade-7", aspectRatio: 1.2 },
  ],
  people: [
    { id: 3001, seed: "portrait-smile-1", aspectRatio: 0.75 },
    { id: 3002, seed: "group-friends-2", aspectRatio: 1.33 },
    { id: 3003, seed: "person-working-3", aspectRatio: 1 },
    { id: 3004, seed: "candid-moment-4", aspectRatio: 0.8 },
    { id: 3005, seed: "lifestyle-5", aspectRatio: 1.2 },
    { id: 3006, seed: "outdoor-activity-6", aspectRatio: 0.67 },
    { id: 3007, seed: "urban-portrait-7", aspectRatio: 0.75 },
  ],
  abstract: [
    { id: 4001, seed: "geometric-pattern-1", aspectRatio: 1 },
    { id: 4002, seed: "colorful-abstract-2", aspectRatio: 1.2 },
    { id: 4003, seed: "texture-close-3", aspectRatio: 0.8 },
    { id: 4004, seed: "minimalist-art-4", aspectRatio: 1.33 },
    { id: 4005, seed: "light-shadow-5", aspectRatio: 0.75 },
    { id: 4006, seed: "artistic-blur-6", aspectRatio: 1.5 },
    { id: 4007, seed: "pattern-design-7", aspectRatio: 1 },
  ],
  urban: [
    { id: 5001, seed: "city-street-1", aspectRatio: 1.33 },
    { id: 5002, seed: "urban-night-2", aspectRatio: 1.5 },
    { id: 5003, seed: "downtown-scene-3", aspectRatio: 0.75 },
    { id: 5004, seed: "graffiti-wall-4", aspectRatio: 1 },
    { id: 5005, seed: "subway-metro-5", aspectRatio: 0.8 },
    { id: 5006, seed: "city-skyline-6", aspectRatio: 1.2 },
    { id: 5007, seed: "urban-traffic-7", aspectRatio: 0.67 },
  ],
  animals: [
    { id: 6001, seed: "wildlife-cat-1", aspectRatio: 0.75 },
    { id: 6002, seed: "dog-pet-2", aspectRatio: 1 },
    { id: 6003, seed: "bird-flying-3", aspectRatio: 1.33 },
    { id: 6004, seed: "ocean-life-4", aspectRatio: 1.2 },
    { id: 6005, seed: "zoo-animal-5", aspectRatio: 0.8 },
    { id: 6006, seed: "insect-macro-6", aspectRatio: 1 },
    { id: 6007, seed: "farm-animals-7", aspectRatio: 0.67 },
  ],
  food: [
    { id: 7001, seed: "gourmet-dish-1", aspectRatio: 1 },
    { id: 7002, seed: "fresh-fruits-2", aspectRatio: 0.8 },
    { id: 7003, seed: "restaurant-meal-3", aspectRatio: 1.2 },
    { id: 7004, seed: "bakery-bread-4", aspectRatio: 0.75 },
    { id: 7005, seed: "coffee-drink-5", aspectRatio: 1.33 },
    { id: 7006, seed: "dessert-sweet-6", aspectRatio: 1 },
    { id: 7007, seed: "vegetables-fresh-7", aspectRatio: 0.67 },
  ],
  travel: [
    { id: 8001, seed: "beach-paradise-1", aspectRatio: 1.5 },
    { id: 8002, seed: "mountain-hiking-2", aspectRatio: 0.67 },
    { id: 8003, seed: "city-tour-3", aspectRatio: 1.33 },
    { id: 8004, seed: "landmark-famous-4", aspectRatio: 0.75 },
    { id: 8005, seed: "adventure-outdoor-5", aspectRatio: 1 },
    { id: 8006, seed: "cultural-place-6", aspectRatio: 1.2 },
    { id: 8007, seed: "road-trip-7", aspectRatio: 0.8 },
  ],
};

const galleryImages = Object.entries(categoryImages).flatMap(([category, images]) =>
  images.map((img) => ({
    id: img.id,
    src: `https://picsum.photos/seed/${img.seed}/800/${Math.floor(800 / img.aspectRatio)}`,
    category,
    aspectRatio: img.aspectRatio,
  }))
);

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = useMemo(() => {
    if (activeCategory === "all") return galleryImages;
    return galleryImages.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  const handleNavigate = (direction: "prev" | "next") => {
    if (lightboxIndex === null) return;
    
    if (direction === "prev" && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    } else if (direction === "next" && lightboxIndex < filteredImages.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <GalleryHeader />
      <CategoryFilter 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />
      <MasonryGallery 
        images={filteredImages} 
        onImageClick={setLightboxIndex} 
      />
      
      {lightboxIndex !== null && (
        <Lightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}
