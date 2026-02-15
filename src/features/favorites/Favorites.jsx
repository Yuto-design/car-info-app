import { useState, useMemo } from 'react';
import { getCarById } from '../../data/cars';
import { getFavoriteIds, removeFavorite } from '../../data/favorites';
import FavoritesEmpty from './FavoritesEmpty';
import FavoritesGrid from './FavoritesGrid';
import './Favorites.css';

function Favorites() {
  const [favoriteIds, setFavoriteIds] = useState(() => getFavoriteIds());

  const favoriteCars = useMemo(() => {
    return favoriteIds
      .map((id) => getCarById(id))
      .filter(Boolean);
  }, [favoriteIds]);

  const handleRemove = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    removeFavorite(id);
    setFavoriteIds((prev) => prev.filter((x) => x !== id));
  };

  return (
    <div className="favorites">
      <p className="favorites-intro">
        お気に入りに登録した車種一覧です。詳細から解除できます。
      </p>
      {favoriteCars.length > 0 ? (
        <FavoritesGrid cars={favoriteCars} onRemove={handleRemove} />
      ) : (
        <FavoritesEmpty />
      )}
    </div>
  );
}

export default Favorites;
