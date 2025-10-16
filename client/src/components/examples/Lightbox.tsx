import { useState } from "react";
import { Lightbox } from "../Lightbox";
import { Button } from "@/components/ui/button";

const sampleImages = [
  { id: 1, src: "https://picsum.photos/seed/1/1200/800", category: "Nature" },
  { id: 2, src: "https://picsum.photos/seed/2/1200/800", category: "Architecture" },
  { id: 3, src: "https://picsum.photos/seed/3/1200/800", category: "People" },
];

export default function LightboxExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNavigate = (direction: "prev" | "next") => {
    if (direction === "prev" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === "next" && currentIndex < sampleImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="p-8">
      <Button onClick={() => setIsOpen(true)}>Open Lightbox</Button>
      
      {isOpen && (
        <Lightbox
          images={sampleImages}
          currentIndex={currentIndex}
          onClose={() => setIsOpen(false)}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}
