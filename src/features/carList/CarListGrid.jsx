import { Link } from 'react-router-dom';
import Card from '../../components/Card';

function CarListGrid({ cars }) {
  return (
    <>
      <p className="car-list-count" aria-live="polite">
        {cars.length}件の車種
      </p>
      <div className="car-list-grid">
        {cars.map((car) => (
          <Card key={car.id} as={Link} to={`/car/${car.slug || car.id}`} className="card--car">
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
            </div>
          </Card>
        ))}
      </div>
      {cars.length === 0 && (
        <p className="car-list-empty">
          条件に一致する車種がありません。フィルタを変えてお試しください。
        </p>
      )}
    </>
  );
}

export default CarListGrid;
