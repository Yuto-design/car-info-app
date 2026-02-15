import { useFavorites } from './useFavorites';
import FavoritesEmpty from './FavoritesEmpty';
import FavoritesGrid from './FavoritesGrid';
import './Favorites.css';

function Favorites() {
  const { favoriteCars, removeFavorite } = useFavorites();

  return (
    <div className="favorites">
      <p className="favorites-intro">
        お気に入りに登録した車種一覧です。詳細から解除できます。
      </p>
      {favoriteCars.length > 0 ? (
        <FavoritesGrid cars={favoriteCars} onRemove={removeFavorite} />
      ) : (
        <FavoritesEmpty />
      )}
    </div>
  );
}

export default Favorites;
