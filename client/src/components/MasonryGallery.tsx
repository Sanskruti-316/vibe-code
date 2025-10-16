import { ImageCard } from "./ImageCard";

interface GalleryImage {
  id: number;
  src: string;
  category: string;
  aspectRatio: number;
}

interface MasonryGalleryProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

export function MasonryGallery({ images, onImageClick }: MasonryGalleryProps) {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-testid="gallery-masonry">
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6 lg:gap-8 space-y-4 sm:space-y-6 lg:space-y-8">
        {images.map((image, index) => (
          <div key={image.id} className="break-inside-avoid">
            <ImageCard
              id={image.id}
              src={image.src}
              category={image.category}
              aspectRatio={image.aspectRatio}
              onClick={() => onImageClick(index)}
            />
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg" data-testid="text-no-images">
            No images found in this category
          </p>
        </div>
      )}
    </div>
  );
}
