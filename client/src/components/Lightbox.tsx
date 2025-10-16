import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LightboxProps {
  images: { id: number; src: string; category: string }[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
}

export function Lightbox({ images, currentIndex, onClose, onNavigate }: LightboxProps) {
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

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 animate-fade-in"
      onClick={onClose}
      data-testid="lightbox-overlay"
    >
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white hover:bg-white/10 backdrop-blur-sm"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          data-testid="button-lightbox-close"
        >
          <X className="h-6 w-6" />
        </Button>

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
          className="max-w-7xl max-h-[90vh] animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={currentImage.src}
            alt={`${currentImage.category} photo ${currentImage.id}`}
            className="max-w-full max-h-[90vh] object-contain"
            data-testid={`image-lightbox-${currentImage.id}`}
          />
          
          <div className="mt-4 text-center">
            <p className="text-white/90 text-base font-medium" data-testid="text-lightbox-category">
              {currentImage.category}
            </p>
            <p className="text-white/60 text-sm mt-1" data-testid="text-lightbox-counter">
              {currentIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
