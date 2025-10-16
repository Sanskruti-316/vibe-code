import { MasonryGallery } from "../MasonryGallery";

const sampleImages = [
  { id: 1, src: "https://picsum.photos/seed/1/600/800", category: "Nature", aspectRatio: 0.75 },
  { id: 2, src: "https://picsum.photos/seed/2/600/400", category: "Architecture", aspectRatio: 1.5 },
  { id: 3, src: "https://picsum.photos/seed/3/600/900", category: "People", aspectRatio: 0.67 },
  { id: 4, src: "https://picsum.photos/seed/4/600/600", category: "Abstract", aspectRatio: 1 },
  { id: 5, src: "https://picsum.photos/seed/5/600/750", category: "Urban", aspectRatio: 0.8 },
  { id: 6, src: "https://picsum.photos/seed/6/600/450", category: "Animals", aspectRatio: 1.33 },
];

export default function MasonryGalleryExample() {
  return (
    <MasonryGallery
      images={sampleImages}
      onImageClick={(index) => console.log("Image clicked:", index)}
    />
  );
}
