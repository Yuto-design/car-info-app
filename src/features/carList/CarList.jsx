import { Link } from 'react-router-dom';
import { useCarListFilters } from './useCarListFilters';
import CarListFilters from './CarListFilters';
import CarListGrid from './CarListGrid';
import Button from '../../components/Button';
import '../styles/CarList.css';

function CarList() {
  const { allCars, filters, setFilters, filteredCars } = useCarListFilters();

  return (
    <div className="car-list">
      <p className="car-list-intro">
        条件で絞り込んで車種を探せます。
      </p>
      <div className="car-list-top-actions">
        <Button as={Link} to="/admin/register" variant="secondary">
          車を登録
        </Button>
        <Button as={Link} to="/admin/cars" variant="secondary">
          登録車の編集・削除
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
