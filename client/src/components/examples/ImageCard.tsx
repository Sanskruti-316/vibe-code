import { ImageCard } from "../ImageCard";

export default function ImageCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <ImageCard
        id={1}
        src="https://picsum.photos/seed/1/600/800"
        category="Nature"
        title="Mountain Majesty"
        author="Emma Johnson"
        resolution="1920×1280"
        aspectRatio={0.75}
        isFavorite={false}
        onClick={() => console.log("Image clicked")}
        onToggleFavorite={() => console.log("Toggle favorite")}
      />
    </div>
  );
}
