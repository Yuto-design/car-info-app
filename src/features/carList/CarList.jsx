import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getAllCars } from '../../data/cars';
import { filterCars } from './carListUtils';
import CarListFilters from './CarListFilters';
import Card from '../../components/Card';
import Button from '../../components/Button';
import './CarList.css';

function CarList() {
  const allCars = useMemo(() => getAllCars(), []);
  const [filters, setFilters] = useState({});

  const filteredCars = useMemo(
    () => filterCars(allCars, filters),
    [allCars, filters]
  );

  return (
    <div className="car-list">
      <p className="car-list-intro">
        条件で絞り込んで車種を探せます。
      </p>
      <div className="car-list-top-actions">
        <Button as={Link} to="/admin" variant="secondary">
          車種を手入力で追加する
        </Button>
      </div>
      <CarListFilters
        cars={allCars}
        filters={filters}
        onChange={setFilters}
      />
      <p className="car-list-count" aria-live="polite">
        {filteredCars.length}件の車種
      </p>
      <div className="car-list-grid">
        {filteredCars.map((car) => (
          <Card key={car.id} as={Link} to={`/car/${car.slug || car.id}`} className="card--car">
            <img
              src={car.image}
              alt={car.name}
              className="card-image"
            />
            <div className="card-body">
              <h3 className="card-title">{car.maker} {car.name}</h3>
              <p className="card-meta">{car.segment} / {car.fuelType}</p>
              <p className="card-description">{car.description}</p>
              <p className="card-price">価格目安: {car.priceMin}〜{car.priceMax}万円</p>
            </div>
          </Card>
        ))}
      </div>
      {filteredCars.length === 0 && (
        <p className="car-list-empty">
          条件に一致する車種がありません。フィルタを変えてお試しください。
        </p>
      )}
    </div>
  );
}

export default CarList;
