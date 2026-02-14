import { Link } from 'react-router-dom';
import { getFeaturedCars } from '../../data/cars';
import Card from '../../components/Card';
import Button from '../../components/Button';
import './HomeFeatured.css';

function HomeFeatured() {
  const featuredCars = getFeaturedCars();

  return (
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
  );
}

export default HomeFeatured;
