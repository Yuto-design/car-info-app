import { useMemo } from 'react';
import { getCarById } from '../../data/cars';
import { getFavoriteIds } from '../../data/favorites';
import { getComparisonIds } from '../../data/comparison';

const FAVORITES_PREVIEW_COUNT = 3;

/**
 * マイガレージ用：お気に入り・比較リストの車データと派生状態を返すフック
 * @returns {{
 *   favoriteCars: Array,
 *   comparisonCars: Array,
 *   favoritePreview: Array,
 *   hasMoreFavorites: boolean,
 *   hasFavorites: boolean,
 *   hasComparison: boolean,
 *   isEmpty: boolean,
 *   favoritesPreviewCount: number
 * }}
 */
export function useMyGarage() {
  const favoriteCars = useMemo(() => {
    return getFavoriteIds()
      .map((id) => getCarById(id))
      .filter(Boolean);
  }, []);

  const comparisonCars = useMemo(() => {
    return getComparisonIds()
      .map((id) => getCarById(id))
      .filter(Boolean);
  }, []);

  const favoritePreview = useMemo(
    () => favoriteCars.slice(0, FAVORITES_PREVIEW_COUNT),
    [favoriteCars]
  );

  const hasMoreFavorites = favoriteCars.length > FAVORITES_PREVIEW_COUNT;
  const hasFavorites = favoriteCars.length > 0;
  const hasComparison = comparisonCars.length > 0;
  const isEmpty = !hasFavorites && !hasComparison;

  return {
    favoriteCars,
    comparisonCars,
    favoritePreview,
    hasMoreFavorites,
    hasFavorites,
    hasComparison,
    isEmpty,
    favoritesPreviewCount: FAVORITES_PREVIEW_COUNT,
  };
}
