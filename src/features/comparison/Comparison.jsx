import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getAllCars, getCarById } from '../../data/cars';
import {
  getComparisonIds,
  addToComparison,
  removeFromComparison,
} from '../../data/comparison';
import { downloadComparisonCsv } from './exportComparisonCsv';
import Button from '../../components/Button';
import ComparisonTable from './ComparisonTable';
import './Comparison.css';

function Comparison() {
  const [comparisonIds, setComparisonIds] = useState(() => getComparisonIds());
  const [showPrintView, setShowPrintView] = useState(false);

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
              <div className="comparison-actions">
                <p className="comparison-count" aria-live="polite">
                  {comparisonCars.length}台を比較中
                </p>
                <div className="comparison-actions-buttons">
                  <button
                    type="button"
                    className="comparison-export-btn"
                    onClick={() => downloadComparisonCsv(comparisonCars, '比較表')}
                    aria-label="比較表をCSVファイルでダウンロード"
                  >
                    <i className="fa-solid fa-file-export" aria-hidden />
                    比較をCSVでエクスポート
                  </button>
                  <button
                    type="button"
                    className="comparison-print-view-btn"
                    onClick={() => setShowPrintView(true)}
                    aria-label="比較表を印刷用レイアウトで表示"
                  >
                    <i className="fa-solid fa-print" aria-hidden />
                    印刷用レイアウトで表示
                  </button>
                </div>
              </div>
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
          {showPrintView && comparisonCars.length > 0 && (
            <div className="comparison-print-overlay" role="dialog" aria-modal="true" aria-label="比較表・印刷用レイアウト">
              <div className="comparison-print-layout">
                <h2 className="comparison-print-title">比較表</h2>
                <div className="comparison-print-table-wrap">
                  <ComparisonTable cars={comparisonCars} onRemove={() => {}} isPrintView />
                </div>
                <div className="comparison-print-actions">
                  <Button type="button" variant="primary" onClick={() => window.print()} aria-label="印刷する">
                    <i className="fa-solid fa-print" aria-hidden />
                    印刷
                  </Button>
                  <Button type="button" variant="secondary" onClick={() => setShowPrintView(false)} aria-label="閉じる">
                    <i className="fa-solid fa-xmark" aria-hidden />
                    閉じる
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comparison;
