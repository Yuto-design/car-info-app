import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getAllCars } from '../../data/cars';
import { filterCars } from './carListUtils';
import CarListFilters from './CarListFilters';
import CarListGrid from './CarListGrid';
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
      <CarListGrid cars={filteredCars} />
    </div>
  );
}

export default CarList;
