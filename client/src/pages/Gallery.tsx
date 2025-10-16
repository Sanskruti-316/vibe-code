import { useState, useMemo } from "react";
import { GalleryHeader } from "@/components/GalleryHeader";
import { CategoryFilter, type Category } from "@/components/CategoryFilter";
import { MasonryGallery } from "@/components/MasonryGallery";
import { Lightbox } from "@/components/Lightbox";

const aspectRatios = [0.67, 0.75, 0.8, 1, 1.2, 1.33, 1.5];

const categoryImages = {
  nature: [
    { id: 1001, keywords: "forest,mountain", aspectRatio: 0.75 },
    { id: 1002, keywords: "sunset,ocean", aspectRatio: 1.33 },
    { id: 1003, keywords: "green,leaves", aspectRatio: 0.8 },
    { id: 1004, keywords: "waterfall", aspectRatio: 0.67 },
    { id: 1005, keywords: "landscape,valley", aspectRatio: 1.5 },
    { id: 1006, keywords: "flowers,garden", aspectRatio: 1 },
    { id: 1007, keywords: "mountain,peak", aspectRatio: 0.75 },
  ],
  architecture: [
    { id: 2001, keywords: "building,modern", aspectRatio: 0.67 },
    { id: 2002, keywords: "skyscraper,city", aspectRatio: 0.75 },
    { id: 2003, keywords: "bridge", aspectRatio: 1.5 },
    { id: 2004, keywords: "interior,design", aspectRatio: 1.33 },
    { id: 2005, keywords: "architecture,glass", aspectRatio: 1 },
    { id: 2006, keywords: "historic,building", aspectRatio: 0.8 },
    { id: 2007, keywords: "facade,windows", aspectRatio: 1.2 },
  ],
  people: [
    { id: 3001, keywords: "portrait,person", aspectRatio: 0.75 },
    { id: 3002, keywords: "people,friends", aspectRatio: 1.33 },
    { id: 3003, keywords: "person,working", aspectRatio: 1 },
    { id: 3004, keywords: "candid,smile", aspectRatio: 0.8 },
    { id: 3005, keywords: "lifestyle,happy", aspectRatio: 1.2 },
    { id: 3006, keywords: "outdoor,person", aspectRatio: 0.67 },
    { id: 3007, keywords: "face,portrait", aspectRatio: 0.75 },
  ],
  abstract: [
    { id: 4001, keywords: "abstract,pattern", aspectRatio: 1 },
    { id: 4002, keywords: "colorful,art", aspectRatio: 1.2 },
    { id: 4003, keywords: "texture", aspectRatio: 0.8 },
    { id: 4004, keywords: "minimal,design", aspectRatio: 1.33 },
    { id: 4005, keywords: "light,shadow", aspectRatio: 0.75 },
    { id: 4006, keywords: "abstract,blur", aspectRatio: 1.5 },
    { id: 4007, keywords: "geometric", aspectRatio: 1 },
  ],
  urban: [
    { id: 5001, keywords: "street,city", aspectRatio: 1.33 },
    { id: 5002, keywords: "urban,night", aspectRatio: 1.5 },
    { id: 5003, keywords: "downtown,buildings", aspectRatio: 0.75 },
    { id: 5004, keywords: "graffiti,wall", aspectRatio: 1 },
    { id: 5005, keywords: "subway,metro", aspectRatio: 0.8 },
    { id: 5006, keywords: "skyline,city", aspectRatio: 1.2 },
    { id: 5007, keywords: "traffic,urban", aspectRatio: 0.67 },
  ],
  animals: [
    { id: 6001, keywords: "cat,pet", aspectRatio: 0.75 },
    { id: 6002, keywords: "dog,animal", aspectRatio: 1 },
    { id: 6003, keywords: "bird,flying", aspectRatio: 1.33 },
    { id: 6004, keywords: "ocean,fish", aspectRatio: 1.2 },
    { id: 6005, keywords: "wildlife,animal", aspectRatio: 0.8 },
    { id: 6006, keywords: "butterfly,insect", aspectRatio: 1 },
    { id: 6007, keywords: "horse,farm", aspectRatio: 0.67 },
  ],
  food: [
    { id: 7001, keywords: "food,dish", aspectRatio: 1 },
    { id: 7002, keywords: "fruit,fresh", aspectRatio: 0.8 },
    { id: 7003, keywords: "restaurant,meal", aspectRatio: 1.2 },
    { id: 7004, keywords: "bread,bakery", aspectRatio: 0.75 },
    { id: 7005, keywords: "coffee,drink", aspectRatio: 1.33 },
    { id: 7006, keywords: "dessert,cake", aspectRatio: 1 },
    { id: 7007, keywords: "vegetables", aspectRatio: 0.67 },
  ],
  travel: [
    { id: 8001, keywords: "beach,tropical", aspectRatio: 1.5 },
    { id: 8002, keywords: "mountain,hiking", aspectRatio: 0.67 },
    { id: 8003, keywords: "travel,city", aspectRatio: 1.33 },
    { id: 8004, keywords: "landmark,famous", aspectRatio: 0.75 },
    { id: 8005, keywords: "adventure,outdoor", aspectRatio: 1 },
    { id: 8006, keywords: "temple,culture", aspectRatio: 1.2 },
    { id: 8007, keywords: "road,journey", aspectRatio: 0.8 },
  ],
};

const galleryImages = Object.entries(categoryImages).flatMap(([category, images]) =>
  images.map((img) => {
    const width = 800;
    const height = Math.floor(width / img.aspectRatio);
    return {
      id: img.id,
      src: `https://source.unsplash.com/${width}x${height}/?${img.keywords}`,
      category,
      aspectRatio: img.aspectRatio,
    };
  })
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
