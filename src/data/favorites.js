const STORAGE_KEY = 'carInfoApp.favorites.v1';

function canUseLocalStorage() {
  try {
    return typeof window !== 'undefined' && !!window.localStorage;
  } catch {
    return false;
  }
}

function readIds() {
  if (!canUseLocalStorage()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeIds(ids) {
  if (!canUseLocalStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function getFavoriteIds() {
  return readIds();
}

export function addFavorite(id) {
  const ids = readIds();
  if (ids.includes(id)) return;
  writeIds([...ids, id]);
}

export function removeFavorite(id) {
  writeIds(readIds().filter((x) => x !== id));
}

export function isFavorite(id) {
  return readIds().includes(id);
}
