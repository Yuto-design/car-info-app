import { Link } from 'react-router-dom';
import { getFeaturedCars } from '../../data/cars';
import Card from '../../components/Card';
import Button from '../../components/Button';
import HomeHeroIcons from './HomeHeroIcons';
import HomeSiteDescList from './HomeSiteDescList';
import './Home.css';

function Home() {
  const featuredCars = getFeaturedCars();

  return (
    <div className="home">
      <section className="home-hero">
        <div className="home-hero-content">
          <p className="home-hero-label">Car Information Summary</p>
          <h2 className="home-hero-title">
            欲しいクルマが、もっと見つかる。
          </h2>
          <p className="home-hero-desc">
            国内の人気車種のスペック・価格・燃費をまとめて比較。<br />
            お気に入り登録や並べ比べで、選びやすく。
          </p>
        </div>
        <div className="home-hero-visual">
          <HomeHeroIcons />
          <HomeSiteDescList />
        </div>
      </section>

      <section className="home-featured">
        <h3 className="home-section-title">Featured Cars</h3>
        <p className="home-section-desc">人気の車種をピックアップしました。</p>
        <div className="home-featured-grid">
          {featuredCars.map((car) => (
            <Card key={car.id} as={Link} to={`/car/${car.slug || car.id}`} className="card--car">
              {car.image ? (
                <img src={car.image} alt={car.name} className="card-image" />
              ) : (
                <div className="card-image card-image--placeholder" aria-hidden="true">
                  <span>{car.maker} {car.name}</span>
                </div>
              )}
              <div className="card-body">
                <h4 className="card-title">{car.maker} {car.name}</h4>
                <p className="card-meta">{car.segment} / {car.fuelType}</p>
                <p className="card-description">{car.description}</p>
                {car.price != null && car.price > 0 && (
                <p className="card-price">価格: {Number(car.price).toLocaleString()}万円</p>
              )}
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
