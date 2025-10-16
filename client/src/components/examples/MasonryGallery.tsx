import { MasonryGallery } from "../MasonryGallery";

const sampleImages = [
  { id: 1, src: "https://picsum.photos/seed/1/600/800", category: "Nature", title: "Forest Path", author: "Emma Johnson", resolution: "1920×1280", aspectRatio: 0.75 },
  { id: 2, src: "https://picsum.photos/seed/2/600/400", category: "Architecture", title: "Modern Building", author: "Michael Chen", resolution: "1920×1080", aspectRatio: 1.5 },
  { id: 3, src: "https://picsum.photos/seed/3/600/900", category: "People", title: "Urban Portrait", author: "Sarah Williams", resolution: "1200×1600", aspectRatio: 0.67 },
  { id: 4, src: "https://picsum.photos/seed/4/600/600", category: "Abstract", title: "Color Pattern", author: "David Martinez", resolution: "1920×1920", aspectRatio: 1 },
  { id: 5, src: "https://picsum.photos/seed/5/600/750", category: "Urban", title: "City Streets", author: "Jessica Brown", resolution: "1600×1200", aspectRatio: 0.8 },
  { id: 6, src: "https://picsum.photos/seed/6/600/450", category: "Animals", title: "Wildlife", author: "Alex Thompson", resolution: "1920×1440", aspectRatio: 1.33 },
];

export default function MasonryGalleryExample() {
  return (
    <MasonryGallery
      images={sampleImages}
      favorites={new Set([2, 4])}
      onImageClick={(index) => console.log("Image clicked:", index)}
      onToggleFavorite={(id) => console.log("Toggle favorite:", id)}
    />
  );
}
