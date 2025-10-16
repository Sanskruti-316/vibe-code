import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface LightboxImage {
  id: number;
  src: string;
  category: string;
  title: string;
  author: string;
  resolution: string;
}

interface LightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  favorites: Set<number>;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
  onToggleFavorite: (imageId: number) => void;
}

export function Lightbox({ images, currentIndex, favorites, onClose, onNavigate, onToggleFavorite }: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate("prev");
      if (e.key === "ArrowRight") onNavigate("next");
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose, onNavigate]);

  const currentImage = images[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;
  const isFavorite = favorites.has(currentImage.id);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 animate-fade-in"
      onClick={onClose}
      data-testid="lightbox-overlay"
    >
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className={`text-white backdrop-blur-sm transition-all ${
              isFavorite 
                ? "bg-primary/20 hover:bg-primary/30" 
                : "hover:bg-white/10"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(currentImage.id);
            }}
            data-testid="button-lightbox-favorite"
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            data-testid="button-lightbox-close"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {hasPrev && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 backdrop-blur-sm h-12 w-12"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate("prev");
            }}
            data-testid="button-lightbox-prev"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
        )}

        {hasNext && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 backdrop-blur-sm h-12 w-12"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate("next");
            }}
            data-testid="button-lightbox-next"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        )}

        <div 
          className="max-w-7xl max-h-[85vh] animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={currentImage.src}
            alt={currentImage.title}
            className="max-w-full max-h-[85vh] object-contain"
            data-testid={`image-lightbox-${currentImage.id}`}
          />
          
          <div className="mt-6 text-center space-y-2 px-4">
            <h2 className="text-white text-xl font-semibold" data-testid="text-lightbox-title">
              {currentImage.title}
            </h2>
            <p className="text-white/80 text-base" data-testid="text-lightbox-author">
              by {currentImage.author}
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-white/70">
              <span className="uppercase tracking-wide" data-testid="text-lightbox-category">
                {currentImage.category}
              </span>
              <span>•</span>
              <span data-testid="text-lightbox-resolution">{currentImage.resolution}</span>
              <span>•</span>
              <span data-testid="text-lightbox-counter">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
