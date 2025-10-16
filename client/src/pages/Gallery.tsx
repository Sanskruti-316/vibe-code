import { useState, useMemo } from "react";
import { GalleryHeader } from "@/components/GalleryHeader";
import { CategoryFilter, type Category } from "@/components/CategoryFilter";
import { MasonryGallery } from "@/components/MasonryGallery";
import { Lightbox } from "@/components/Lightbox";

const aspectRatios = [0.67, 0.75, 0.8, 1, 1.2, 1.33, 1.5];

const categories = ["nature", "architecture", "people", "abstract", "urban", "animals", "food", "travel"];

const galleryImages = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  src: `https://picsum.photos/seed/${i + 1}/800/${Math.floor(Math.random() * 400) + 600}`,
  category: categories[Math.floor(Math.random() * categories.length)],
  aspectRatio: aspectRatios[Math.floor(Math.random() * aspectRatios.length)],
}));

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
