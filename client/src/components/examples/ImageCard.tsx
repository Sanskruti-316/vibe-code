import { ImageCard } from "../ImageCard";

export default function ImageCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <ImageCard
        id={1}
        src="https://picsum.photos/seed/1/600/800"
        category="Nature"
        aspectRatio={0.75}
        onClick={() => console.log("Image clicked")}
      />
    </div>
  );
}
