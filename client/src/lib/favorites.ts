const FAVORITES_KEY = "gallery-favorites";

export function getFavorites(): Set<number> {
  if (typeof window === "undefined") return new Set();
  
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
}

export function toggleFavorite(imageId: number): Set<number> {
  const favorites = getFavorites();
  
  if (favorites.has(imageId)) {
    favorites.delete(imageId);
  } else {
    favorites.add(imageId);
  }
  
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
  return favorites;
}

export function isFavorite(imageId: number): boolean {
  return getFavorites().has(imageId);
}
