import { useState, useMemo, useEffect } from "react";
import { GalleryHeader } from "@/components/GalleryHeader";
import { CategoryFilter, type Category } from "@/components/CategoryFilter";
import { SearchBar } from "@/components/SearchBar";
import { MasonryGallery, type GalleryImage } from "@/components/MasonryGallery";
import { Lightbox } from "@/components/Lightbox";
import { getFavorites, toggleFavorite } from "@/lib/favorites";

const authors = [
  "Emma Johnson", "Michael Chen", "Sarah Williams", "David Martinez",
  "Jessica Brown", "Alex Thompson", "Rachel Kim", "James Anderson",
  "Sophie Davis", "Daniel Garcia", "Olivia Wilson", "Ryan Miller"
];

const resolutions = ["1920×1080", "1920×1280", "1600×900", "1200×1600", "2400×1600"];

const titles = {
  nature: [
    "Mountain Majesty", "Ocean Sunset", "Forest Whispers", 
    "Waterfall Cascade", "Valley Dreams", "Garden Blooms", "Peak Paradise"
  ],
  architecture: [
    "Urban Giants", "City Skyline", "Bridge to Tomorrow",
    "Modern Sanctuary", "Glass & Steel", "Historic Charm", "Architectural Poetry"
  ],
  people: [
    "Portrait in Light", "Friends Forever", "Creative Minds",
    "Candid Joy", "Life in Motion", "Urban Explorer", "Faces of Grace"
  ],
  abstract: [
    "Geometric Dreams", "Color Symphony", "Texture Study",
    "Minimal Beauty", "Light & Shadow", "Artistic Blur", "Pattern Play"
  ],
  urban: [
    "Street Stories", "Nightlife Glow", "Downtown Pulse",
    "Street Art", "Underground Journey", "City Horizon", "Urban Flow"
  ],
  animals: [
    "Feline Grace", "Loyal Companion", "Wings of Freedom",
    "Ocean Depths", "Wild Spirit", "Butterfly Dance", "Farm Life"
  ],
  food: [
    "Culinary Art", "Fresh Harvest", "Dining Delight",
    "Artisan Bread", "Coffee Break", "Sweet Indulgence", "Garden Fresh"
  ],
  travel: [
    "Paradise Found", "Mountain Quest", "City Adventures",
    "Iconic Landmarks", "Outdoor Escape", "Cultural Journey", "Road Ahead"
  ],
};

const categoryImages = {
  nature: [
    { id: 1001, picsum_id: 1015, aspectRatio: 0.75 },
    { id: 1002, picsum_id: 1018, aspectRatio: 1.33 },
    { id: 1003, picsum_id: 1020, aspectRatio: 0.8 },
    { id: 1004, picsum_id: 1024, aspectRatio: 0.67 },
    { id: 1005, picsum_id: 1025, aspectRatio: 1.5 },
    { id: 1006, picsum_id: 1035, aspectRatio: 1 },
    { id: 1007, picsum_id: 1036, aspectRatio: 0.75 },
  ],
  architecture: [
    { id: 2001, picsum_id: 1005, aspectRatio: 0.67 },
    { id: 2002, picsum_id: 1022, aspectRatio: 0.75 },
    { id: 2003, picsum_id: 1037, aspectRatio: 1.5 },
    { id: 2004, picsum_id: 1040, aspectRatio: 1.33 },
    { id: 2005, picsum_id: 1041, aspectRatio: 1 },
    { id: 2006, picsum_id: 1042, aspectRatio: 0.8 },
    { id: 2007, picsum_id: 1043, aspectRatio: 1.2 },
  ],
  people: [
    { id: 3001, picsum_id: 1027, aspectRatio: 0.75 },
    { id: 3002, picsum_id: 1044, aspectRatio: 1.33 },
    { id: 3003, picsum_id: 1045, aspectRatio: 1 },
    { id: 3004, picsum_id: 1046, aspectRatio: 0.8 },
    { id: 3005, picsum_id: 1047, aspectRatio: 1.2 },
    { id: 3006, picsum_id: 1048, aspectRatio: 0.67 },
    { id: 3007, picsum_id: 1049, aspectRatio: 0.75 },
  ],
  abstract: [
    { id: 4001, picsum_id: 1050, aspectRatio: 1 },
    { id: 4002, picsum_id: 1051, aspectRatio: 1.2 },
    { id: 4003, picsum_id: 1052, aspectRatio: 0.8 },
    { id: 4004, picsum_id: 1053, aspectRatio: 1.33 },
    { id: 4005, picsum_id: 1054, aspectRatio: 0.75 },
    { id: 4006, picsum_id: 1055, aspectRatio: 1.5 },
    { id: 4007, picsum_id: 1056, aspectRatio: 1 },
  ],
  urban: [
    { id: 5001, picsum_id: 1057, aspectRatio: 1.33 },
    { id: 5002, picsum_id: 1058, aspectRatio: 1.5 },
    { id: 5003, picsum_id: 1059, aspectRatio: 0.75 },
    { id: 5004, picsum_id: 1060, aspectRatio: 1 },
    { id: 5005, picsum_id: 1061, aspectRatio: 0.8 },
    { id: 5006, picsum_id: 1062, aspectRatio: 1.2 },
    { id: 5007, picsum_id: 1063, aspectRatio: 0.67 },
  ],
  animals: [
    { id: 6001, picsum_id: 1074, aspectRatio: 0.75 },
    { id: 6002, picsum_id: 1076, aspectRatio: 1 },
    { id: 6003, picsum_id: 1077, aspectRatio: 1.33 },
    { id: 6004, picsum_id: 1078, aspectRatio: 1.2 },
    { id: 6005, picsum_id: 1079, aspectRatio: 0.8 },
    { id: 6006, picsum_id: 1080, aspectRatio: 1 },
    { id: 6007, picsum_id: 1081, aspectRatio: 0.67 },
  ],
  food: [
    { id: 7001, picsum_id: 1080, aspectRatio: 1 },
    { id: 7002, picsum_id: 1082, aspectRatio: 0.8 },
    { id: 7003, picsum_id: 1083, aspectRatio: 1.2 },
    { id: 7004, picsum_id: 1084, aspectRatio: 0.75 },
    { id: 7005, picsum_id: 1085, aspectRatio: 1.33 },
    { id: 7006, picsum_id: 1086, aspectRatio: 1 },
    { id: 7007, picsum_id: 1087, aspectRatio: 0.67 },
  ],
  travel: [
    { id: 8001, picsum_id: 1088, aspectRatio: 1.5 },
    { id: 8002, picsum_id: 1089, aspectRatio: 0.67 },
    { id: 8003, picsum_id: 1090, aspectRatio: 1.33 },
    { id: 8004, picsum_id: 1091, aspectRatio: 0.75 },
    { id: 8005, picsum_id: 1092, aspectRatio: 1 },
    { id: 8006, picsum_id: 1093, aspectRatio: 1.2 },
    { id: 8007, picsum_id: 1094, aspectRatio: 0.8 },
  ],
};

const galleryImages: GalleryImage[] = Object.entries(categoryImages).flatMap(([category, images]) =>
  images.map((img, index) => {
    const width = 800;
    const height = Math.floor(width / img.aspectRatio);
    const categoryTitles = titles[category as keyof typeof titles];
    
    return {
      id: img.id,
      src: `https://picsum.photos/id/${img.picsum_id}/${width}/${height}`,
      category,
      title: categoryTitles[index],
      author: authors[Math.floor(Math.random() * authors.length)],
      resolution: resolutions[Math.floor(Math.random() * resolutions.length)],
      aspectRatio: img.aspectRatio,
    };
  })
);

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleToggleFavorite = (imageId: number) => {
    const newFavorites = toggleFavorite(imageId);
    setFavorites(new Set(newFavorites));
  };

  const filteredImages = useMemo(() => {
    let result = galleryImages;

    if (activeCategory !== "all") {
      result = result.filter((img) => img.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (img) =>
          img.title.toLowerCase().includes(query) ||
          img.author.toLowerCase().includes(query) ||
          img.category.toLowerCase().includes(query)
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

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
      <SearchBar 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <MasonryGallery 
        images={filteredImages}
        favorites={favorites}
        onImageClick={setLightboxIndex}
        onToggleFavorite={handleToggleFavorite}
      />
      
      {lightboxIndex !== null && (
        <Lightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          favorites={favorites}
          onClose={() => setLightboxIndex(null)}
          onNavigate={handleNavigate}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </div>
  );
}
