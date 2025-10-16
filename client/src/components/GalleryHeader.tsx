import { Images } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function GalleryHeader() {
  return (
    <header className="sticky top-0 z-50 border-b backdrop-blur-lg bg-background/90" data-testid="header-gallery">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <Images className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight" data-testid="text-gallery-title">
                Premium Gallery
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Explore stunning photography
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
