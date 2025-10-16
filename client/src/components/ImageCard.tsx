import { useState, useRef, useEffect } from "react";
import { Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ImageCardProps {
  id: number;
  src: string;
  category: string;
  title: string;
  author: string;
  resolution: string;
  aspectRatio?: number;
  isFavorite: boolean;
  onClick: () => void;
  onToggleFavorite: (e: React.MouseEvent) => void;
}

export function ImageCard({ 
  id, 
  src, 
  category, 
  title,
  author,
  resolution,
  aspectRatio = 1, 
  isFavorite,
  onClick,
  onToggleFavorite
}: ImageCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Card
      ref={cardRef}
      className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover-elevate active-elevate-2"
      style={{ aspectRatio }}
      onClick={onClick}
      data-testid={`card-image-${id}`}
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      
      {isVisible && (
        <img
          ref={imgRef}
          src={src}
          alt={title}
          className={`w-full h-full object-cover transition-all duration-400 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
        />
      )}
      
      <div className="absolute top-2 right-2 z-10">
        <Button
          variant="ghost"
          size="icon"
          className={`h-9 w-9 rounded-full backdrop-blur-sm transition-all duration-200 ${
            isFavorite 
              ? "bg-primary/20 text-primary hover:bg-primary/30" 
              : "bg-black/20 text-white hover:bg-black/40"
          }`}
          onClick={onToggleFavorite}
          data-testid={`button-favorite-${id}`}
        >
          <Heart className={`h-5 w-5 transition-all ${isFavorite ? "fill-current" : ""}`} />
        </Button>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1">
          <h3 className="text-white font-semibold text-base line-clamp-1" data-testid={`text-title-${id}`}>
            {title}
          </h3>
          <p className="text-white/80 text-sm">
            by {author}
          </p>
          <div className="flex items-center gap-3 text-xs text-white/70">
            <span className="uppercase tracking-wide">{category}</span>
            <span>•</span>
            <span>{resolution}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
