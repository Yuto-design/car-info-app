import { useState } from 'react';
import { useFavorites } from './useFavorites';
import { downloadCsv } from './exportFavoritesCsv';
import Button from '../../components/Button';
import FavoritesEmpty from './FavoritesEmpty';
import FavoritesGrid from './FavoritesGrid';
import '../styles/Favorites.css';

function Favorites() {
  const { favoriteCars, removeFavorite } = useFavorites();
  const [showPrintView, setShowPrintView] = useState(false);

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
            <button
              type="button"
              className="favorites-print-view-btn"
              onClick={() => setShowPrintView(true)}
              aria-label="お気に入り一覧を印刷用レイアウトで表示"
            >
              <i className="fa-solid fa-print" aria-hidden />
              印刷用レイアウトで表示
            </button>
          </div>
          <FavoritesGrid cars={favoriteCars} onRemove={removeFavorite} />
          {showPrintView && (
            <div className="favorites-print-overlay" role="dialog" aria-modal="true" aria-label="お気に入り一覧・印刷用レイアウト">
              <div className="favorites-print-layout">
                <h2 className="favorites-print-title">お気に入り一覧</h2>
                <div className="favorites-print-content">
                  <FavoritesGrid cars={favoriteCars} onRemove={() => {}} isPrintView />
                </div>
                <div className="favorites-print-actions">
                  <Button type="button" variant="primary" onClick={() => window.print()} aria-label="印刷する">
                    <i className="fa-solid fa-print" aria-hidden />
                    印刷
                  </Button>
                  <Button type="button" variant="secondary" onClick={() => setShowPrintView(false)} aria-label="閉じる">
                    <i className="fa-solid fa-xmark" aria-hidden />
                    閉じる
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <FavoritesEmpty />
      )}
    </div>
  );
}

export default Favorites;
