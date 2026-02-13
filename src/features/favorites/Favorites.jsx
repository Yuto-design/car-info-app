import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getCarById } from '../../data/cars';
import { getFavoriteIds, removeFavorite } from '../../data/favorites';
import Card from '../../components/Card';
import Button from '../../components/Button';
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
        <>
          <p className="favorites-count" aria-live="polite">
            {favoriteCars.length}件
          </p>
          <div className="favorites-grid">
            {favoriteCars.map((car) => (
              <Card key={car.id} as={Link} to={`/car/${car.slug || car.id}`} className="card--car favorites-card">
                <img
                  src={car.image}
                  alt={car.name}
                  className="card-image"
                />
                <div className="card-body">
                  <h3 className="card-title">{car.maker} {car.name}</h3>
                  <p className="card-meta">{car.segment} / {car.fuelType}</p>
                  <p className="card-description">{car.description}</p>
                  {car.price != null && car.price > 0 && (
                  <p className="card-price">価格: {Number(car.price).toLocaleString()}万円</p>
                )}
                  <Button
                    type="button"
                    variant="secondary"
                    className="favorites-remove"
                    onClick={(e) => handleRemove(e, car.id)}
                    aria-label={`${car.maker} ${car.name}をお気に入りから外す`}
                  >
                    <i className="fa-solid fa-heart-crack" aria-hidden></i>
                    お気に入りから外す
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <div className="favorites-empty">
          <span className="favorites-empty-icon" aria-hidden>
            <i className="fa-regular fa-heart"></i>
          </span>
          <p className="favorites-empty-text">お気に入り登録された車種はありません</p>
          <p className="favorites-empty-hint">車種詳細ページから「お気に入りに追加」で登録できます。</p>
          <Button as={Link} to="/list" variant="primary">
            車一覧を見る
          </Button>
        </div>
      )}
    </div>
  );
}

export default Favorites;
