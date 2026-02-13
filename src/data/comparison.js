const STORAGE_KEY = 'carInfoApp.comparison.v1';
const MAX_ITEMS = 4;

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
    return Array.isArray(parsed) ? parsed.slice(0, MAX_ITEMS) : [];
  } catch {
    return [];
  }
}

function writeIds(ids) {
  if (!canUseLocalStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids.slice(0, MAX_ITEMS)));
}

export function getComparisonIds() {
  return readIds();
}

export function addToComparison(id) {
  const ids = readIds();
  if (ids.includes(id)) return;
  if (ids.length >= MAX_ITEMS) return;
  writeIds([...ids, id]);
}

export function removeFromComparison(id) {
  writeIds(readIds().filter((x) => x !== id));
}

export function isInComparison(id) {
  return readIds().includes(id);
}

export function canAddToComparison() {
  return readIds().length < MAX_ITEMS;
}
