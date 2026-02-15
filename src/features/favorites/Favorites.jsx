import { useFavorites } from './useFavorites';
import { downloadCsv } from './exportFavoritesCsv';
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
        <>
          <div className="favorites-actions">
            <button
              type="button"
              className="favorites-export-btn"
              onClick={() => downloadCsv(favoriteCars)}
              aria-label="お気に入り一覧をCSVでダウンロード"
            >
              <i className="fa-solid fa-file-export" aria-hidden />
              CSVでエクスポート
            </button>
          </div>
          <FavoritesGrid cars={favoriteCars} onRemove={removeFavorite} />
        </>
      ) : (
        <FavoritesEmpty />
      )}
    </div>
  );
}

export default Favorites;
