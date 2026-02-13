import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getAllCars, getCarById } from '../../data/cars';
import {
  getComparisonIds,
  addToComparison,
  removeFromComparison,
} from '../../data/comparison';
import Button from '../../components/Button';
import ComparisonTable from './ComparisonTable';
import './Comparison.css';

function Comparison() {
  const [comparisonIds, setComparisonIds] = useState(() => getComparisonIds());

  const allCars = getAllCars();

  const comparisonCars = useMemo(() => {
    return comparisonIds
      .map((id) => getCarById(id))
      .filter(Boolean);
  }, [comparisonIds]);

  const canAddMore = comparisonIds.length < 4;

  const handleAdd = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    addToComparison(id);
    setComparisonIds(() => getComparisonIds());
  };

  const handleRemove = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromComparison(id);
    setComparisonIds((prev) => prev.filter((x) => x !== id));
  };

  return (
    <div className="comparison">
      <p className="comparison-intro">
        左の一覧から比較したい車種を選んで追加してください。最大4台まで比較できます。
      </p>

      <div className="comparison-layout">
        <aside className="comparison-sidebar">
          <h2 className="comparison-sidebar-title">登録車一覧</h2>
          {allCars.length === 0 ? (
            <p className="comparison-sidebar-empty">登録されている車種がありません</p>
          ) : (
            <ul className="comparison-car-list" aria-label="比較に追加する車を選択">
              {allCars.map((car) => {
                const inComparison = comparisonIds.includes(car.id);
                const showAdd = canAddMore && !inComparison;
                return (
                  <li key={car.id} className="comparison-car-list-item">
                    <Link
                      to={`/car/${car.slug || car.id}`}
                      className="comparison-car-list-link"
                    >
                      <span className="comparison-car-maker">{car.maker}</span>
                      <span className="comparison-car-name">{car.name}</span>
                    </Link>
                    <div className="comparison-car-list-actions">
                      {showAdd && (
                        <Button
                          type="button"
                          variant="primary"
                          className="comparison-add"
                          onClick={(e) => handleAdd(e, car.id)}
                          aria-label={`${car.maker} ${car.name}を比較に追加`}
                        >
                          <i className="fa-solid fa-plus" aria-hidden></i>
                          追加
                        </Button>
                      )}
                      {inComparison && (
                        <Button
                          type="button"
                          variant="secondary"
                          className="comparison-remove-inline"
                          onClick={(e) => handleRemove(e, car.id)}
                          aria-label={`${car.maker} ${car.name}を比較から外す`}
                        >
                          <i className="fa-solid fa-xmark" aria-hidden></i>
                          外す
                        </Button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </aside>

        <div className="comparison-main">
          {comparisonCars.length > 0 ? (
            <>
              <p className="comparison-count" aria-live="polite">
                {comparisonCars.length}台を比較中
              </p>
              <ComparisonTable cars={comparisonCars} onRemove={handleRemove} />
            </>
          ) : (
            <div className="comparison-empty comparison-empty--inline">
              <span className="comparison-empty-icon" aria-hidden>
                <i className="fa-solid fa-scale-balanced"></i>
              </span>
              <p className="comparison-empty-text">比較対象の車種がありません</p>
              <p className="comparison-empty-hint">
                左の一覧から「追加」で比較する車を選んでください。（最大4台）
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comparison;
