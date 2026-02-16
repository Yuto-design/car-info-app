import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getCarById } from '../../data/cars';
import { getFavoriteIds } from '../../data/favorites';
import { getComparisonIds } from '../../data/comparison';
import Card from '../../components/Card';
import Button from '../../components/Button';
import '../styles/MyGarage.css';

const FAVORITES_PREVIEW_COUNT = 3;

function MyGarage() {
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

  const favoritePreview = favoriteCars.slice(0, FAVORITES_PREVIEW_COUNT);
  const hasMoreFavorites = favoriteCars.length > FAVORITES_PREVIEW_COUNT;
  const hasFavorites = favoriteCars.length > 0;
  const hasComparison = comparisonCars.length > 0;
  const isEmpty = !hasFavorites && !hasComparison;

  return (
    <div className="my-garage">
      <p className="my-garage-intro">
        お気に入りと保存した比較を一覧で確認できる、自分用の車選びダッシュボードです。
      </p>

      {isEmpty ? (
        <div className="my-garage-empty">
          <span className="my-garage-empty-icon" aria-hidden>
            <i className="fa-solid fa-garage" />
          </span>
          <h2 className="my-garage-empty-title">まだ登録がありません</h2>
          <p className="my-garage-empty-text">
            お気に入りに車を追加するか、比較リストに車を追加すると、ここにまとめて表示されます。
          </p>
          <div className="my-garage-empty-actions">
            <Button as={Link} to="/list" variant="primary">
              <i className="fa-solid fa-list" aria-hidden />
              車一覧で探す
            </Button>
            <Button as={Link} to="/favorites" variant="secondary">
              <i className="fa-regular fa-heart" aria-hidden />
              お気に入りページ
            </Button>
            <Button as={Link} to="/comparison" variant="secondary">
              <i className="fa-solid fa-scale-balanced" aria-hidden />
              比較ページ
            </Button>
          </div>
        </div>
      ) : (
        <div className="my-garage-dashboard">
          {/* お気に入りブロック */}
          <section className="my-garage-section" aria-labelledby="my-garage-favorites-heading">
            <div className="my-garage-section-header">
              <h2 id="my-garage-favorites-heading" className="my-garage-section-title">
                <i className="fa-regular fa-heart" aria-hidden />
                お気に入り
              </h2>
              <span className="my-garage-section-count" aria-live="polite">
                {favoriteCars.length}件
              </span>
            </div>
            {hasFavorites ? (
              <>
                <div className="my-garage-preview-cards">
                  {favoritePreview.map((car) => (
                    <Card
                      key={car.id}
                      as={Link}
                      to={`/car/${car.slug || car.id}`}
                      className="my-garage-card card--car"
                    >
                      {car.image ? (
                        <img src={car.image} alt={car.name} className="card-image" />
                      ) : (
                        <div className="card-image card-image--placeholder" aria-hidden="true">
                          <span>{car.maker} {car.name}</span>
                        </div>
                      )}
                      <div className="card-body">
                        <h3 className="card-title">{car.maker} {car.name}</h3>
                        <p className="card-meta">{car.segment} / {car.fuelType}</p>
                      </div>
                    </Card>
                  ))}
                </div>
                {hasMoreFavorites && (
                  <p className="my-garage-more">
                    他 {favoriteCars.length - FAVORITES_PREVIEW_COUNT} 件
                  </p>
                )}
                <Button as={Link} to="/favorites" variant="primary" className="my-garage-cta">
                  <i className="fa-solid fa-arrow-right" aria-hidden />
                  お気に入り一覧を見る
                </Button>
              </>
            ) : (
              <div className="my-garage-section-empty">
                <p>お気に入り登録はまだありません。</p>
                <Button as={Link} to="/list" variant="secondary" className="my-garage-cta">
                  車一覧で追加する
                </Button>
              </div>
            )}
          </section>

          {/* 保存した比較ブロック */}
          <section className="my-garage-section" aria-labelledby="my-garage-comparison-heading">
            <div className="my-garage-section-header">
              <h2 id="my-garage-comparison-heading" className="my-garage-section-title">
                <i className="fa-solid fa-scale-balanced" aria-hidden />
                保存した比較
              </h2>
              <span className="my-garage-section-count" aria-live="polite">
                {comparisonCars.length}台
              </span>
            </div>
            {hasComparison ? (
              <>
                <ul className="my-garage-comparison-list" aria-label="比較中の車種">
                  {comparisonCars.map((car) => (
                    <li key={car.id}>
                      <Link to={`/car/${car.slug || car.id}`} className="my-garage-comparison-link">
                        {car.maker} {car.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Button as={Link} to="/comparison" variant="primary" className="my-garage-cta">
                  <i className="fa-solid fa-arrow-right" aria-hidden />
                  比較表を見る
                </Button>
              </>
            ) : (
              <div className="my-garage-section-empty">
                <p>比較リストに車がありません。</p>
                <Button as={Link} to="/comparison" variant="secondary" className="my-garage-cta">
                  比較ページで追加する
                </Button>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

export default MyGarage;
