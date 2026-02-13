import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getCarById } from '../../data/cars';
import { getComparisonIds, removeFromComparison } from '../../data/comparison';
import Button from '../../components/Button';
import ComparisonTable from './ComparisonTable';
import './Comparison.css';

function Comparison() {
  const [comparisonIds, setComparisonIds] = useState(() => getComparisonIds());

  const comparisonCars = useMemo(() => {
    return comparisonIds
      .map((id) => getCarById(id))
      .filter(Boolean);
  }, [comparisonIds]);

  const handleRemove = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromComparison(id);
    setComparisonIds((prev) => prev.filter((x) => x !== id));
  };

  if (comparisonCars.length === 0) {
    return (
      <div className="comparison">
        <p className="comparison-intro">
          比較したい車種を「比較に追加」で登録すると、ここでスペックを並べて確認できます。（最大4台）
        </p>
        <div className="comparison-empty">
          <span className="comparison-empty-icon" aria-hidden>
            <i className="fa-solid fa-scale-balanced"></i>
          </span>
          <p className="comparison-empty-text">比較対象の車種がありません</p>
          <p className="comparison-empty-hint">
            車種詳細ページから「比較に追加」で登録するか、車一覧から選んでください。
          </p>
          <Button as={Link} to="/list" variant="primary">
            車一覧を見る
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="comparison">
      <p className="comparison-intro">
        比較したい車種を並べて表示しています。最大4台まで登録できます。
      </p>
      <p className="comparison-count" aria-live="polite">
        {comparisonCars.length}台を比較中
      </p>

      <ComparisonTable cars={comparisonCars} onRemove={handleRemove} />
    </div>
  );
}

export default Comparison;
