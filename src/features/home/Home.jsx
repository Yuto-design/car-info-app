import { Link } from 'react-router-dom';
import { getFeaturedCars } from '../../data/cars';
import Card from '../../components/Card';
import Button from '../../components/Button';
import './Home.css';

function Home() {
  const featuredCars = getFeaturedCars();

  return (
    <div className="home">
      <section className="home-hero">
        <div className="home-hero-content">
          <p className="home-hero-label">Car Information Summary</p>
          <h2 className="home-hero-title">
            欲しいクルマが、<br />もっと見つかる。
          </h2>
          <p className="home-hero-desc">
            国内の人気車種のスペック・価格・燃費をまとめて比較。<br />
            お気に入り登録や並べ比べで、選びやすく。
          </p>
          <Button as={Link} to="/list" variant="primary" className="home-hero-cta">
            車一覧を見る
          </Button>
        </div>
        <div className="home-hero-visual" aria-hidden="true">
          <span className="home-hero-icon">
            <i className="fa-solid fa-car-on"></i>
          </span>
        </div>
      </section>

      <section className="home-quick">
        <h3 className="home-section-title">Menu</h3>
        <div className="home-quick-grid">
          <Card as={Link} to="/list" className="card--link home-quick-card">
            <span className="home-quick-icon">
                <i className="fa-solid fa-list"></i>
            </span>
            <div>
              <strong className="card-title">Car List</strong>
              <p className="card-meta">条件で絞り込んで車種を探す</p>
            </div>
          </Card>
          <Card as={Link} to="/favorites" className="card--link home-quick-card">
            <span className="home-quick-icon">
              <i className="fa-solid fa-heart"></i>
            </span>
            <div>
              <strong className="card-title">Favorite</strong>
              <p className="card-meta">気になる車を保存して比較</p>
            </div>
          </Card>
          <Card as={Link} to="/comparison" className="card--link home-quick-card">
            <span className="home-quick-icon">
              <i className="fa-solid fa-scale-balanced"></i>
            </span>
            <div>
              <strong className="card-title">Comparison</strong>
              <p className="card-meta">複数車種を並べてスペック比較</p>
            </div>
          </Card>
        </div>
      </section>

      <section className="home-featured">
        <h3 className="home-section-title">Featured Cars</h3>
        <p className="home-section-desc">人気の車種をピックアップしました。</p>
        <div className="home-featured-grid">
          {featuredCars.map((car) => (
            <Card key={car.id} as={Link} to={`/car/${car.slug || car.id}`} className="card--car">
              <img
                src={car.image}
                alt={car.name}
                className="card-image"
              />
              <div className="card-body">
                <h4 className="card-title">{car.maker} {car.name}</h4>
                <p className="card-meta">{car.segment} / {car.fuelType}</p>
                <p className="card-description">{car.description}</p>
                <p className="card-price">価格目安: {car.priceMin}〜{car.priceMax}万円</p>
              </div>
            </Card>
          ))}
        </div>
        <div className="home-featured-actions">
          <Button as={Link} to="/list" variant="secondary">
            すべての車種を見る
          </Button>
        </div>
      </section>
    </div>
  );
}

export default Home;
