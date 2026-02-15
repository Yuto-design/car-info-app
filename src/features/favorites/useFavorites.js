import { useState, useMemo } from 'react';
import { getCarById } from '../../data/cars';
import { getFavoriteIds, removeFavorite as removeFavoriteFromStorage } from '../../data/favorites';

/**
 * お気に入りID一覧の取得・更新、削除ハンドラ、表示用の favoriteCars を提供するフック
 * @returns {{ favoriteCars: Array, removeFavorite: (e: Event, id: string) => void }}
 */
export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState(() => getFavoriteIds());

  const favoriteCars = useMemo(() => {
    return favoriteIds
      .map((id) => getCarById(id))
      .filter(Boolean);
  }, [favoriteIds]);

  const removeFavorite = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    removeFavoriteFromStorage(id);
    setFavoriteIds((prev) => prev.filter((x) => x !== id));
  };

  return { favoriteCars, removeFavorite };
}
