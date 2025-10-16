import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface ImageCardProps {
  id: number;
  src: string;
  category: string;
  aspectRatio?: number;
  onClick: () => void;
}

export function ImageCard({ id, src, category, aspectRatio = 1, onClick }: ImageCardProps) {
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
          alt={`${category} photo ${id}`}
          className={`w-full h-full object-cover transition-all duration-400 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
        />
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span className="text-xs font-medium uppercase tracking-wide text-white/90">
            {category}
          </span>
        </div>
      </div>
    </Card>
  );
}
