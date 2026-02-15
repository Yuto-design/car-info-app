import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import Button from '../../components/Button';

function FavoritesGrid({ cars, onRemove, isPrintView }) {
  return (
    <>
      <p className="favorites-count" aria-live="polite">
        {cars.length}件
      </p>
      <div className="favorites-grid">
        {cars.map((car) => (
          <Card
            key={car.id}
            as={isPrintView ? 'div' : Link}
            to={isPrintView ? undefined : `/car/${car.slug || car.id}`}
            className="card--car favorites-card"
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
              <p className="card-description">{car.description}</p>
              {car.price != null && car.price > 0 && (
                <p className="card-price">価格: {Number(car.price).toLocaleString()}万円</p>
              )}
              {!isPrintView && (
                <Button
                  type="button"
                  variant="secondary"
                  className="favorites-remove"
                  onClick={(e) => onRemove(e, car.id)}
                  aria-label={`${car.maker} ${car.name}をお気に入りから外す`}
                >
                  <i className="fa-solid fa-heart-crack" aria-hidden></i>
                  お気に入りから外す
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

export default FavoritesGrid;
