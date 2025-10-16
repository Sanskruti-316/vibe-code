import { ImageCard } from "./ImageCard";

export interface GalleryImage {
  id: number;
  src: string;
  category: string;
  title: string;
  author: string;
  resolution: string;
  aspectRatio: number;
}

interface MasonryGalleryProps {
  images: GalleryImage[];
  favorites: Set<number>;
  onImageClick: (index: number) => void;
  onToggleFavorite: (imageId: number) => void;
}

export function MasonryGallery({ images, favorites, onImageClick, onToggleFavorite }: MasonryGalleryProps) {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-testid="gallery-masonry">
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6 lg:gap-8 space-y-4 sm:space-y-6 lg:space-y-8">
        {images.map((image, index) => (
          <div key={image.id} className="break-inside-avoid">
            <ImageCard
              id={image.id}
              src={image.src}
              category={image.category}
              title={image.title}
              author={image.author}
              resolution={image.resolution}
              aspectRatio={image.aspectRatio}
              isFavorite={favorites.has(image.id)}
              onClick={() => onImageClick(index)}
              onToggleFavorite={(e) => {
                e.stopPropagation();
                onToggleFavorite(image.id);
              }}
            />
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg" data-testid="text-no-images">
            No images found
          </p>
        </div>
      )}
    </div>
  );
}
