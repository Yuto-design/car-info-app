import { getUniqueValues } from './carListUtils';
import './CarListFilters.css';

const LABELS = {
  segment: 'セグメント',
  maker: 'メーカー',
  fuelType: '燃料',
};

function CarListFilters({ cars, filters, onChange }) {
  const segments = getUniqueValues(cars, 'segment');
  const makers = getUniqueValues(cars, 'maker');
  const fuelTypes = getUniqueValues(cars, 'fuelType');

  const handleChange = (key, value) => {
    const next = { ...filters };
    if (value === '' || value == null) {
      delete next[key];
    } else {
      next[key] = value;
    }
    onChange(next);
  };

  const handleReset = () => onChange({});

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <div className="car-list-filters">
      <div className="car-list-filters-row">
        <label className="car-list-filters-label">
          <span className="car-list-filters-label-text">{LABELS.segment}</span>
          <select
            className="car-list-filters-select"
            value={filters.segment ?? ''}
            onChange={(e) => handleChange('segment', e.target.value || null)}
            aria-label={LABELS.segment}
          >
            <option value="">すべて</option>
            {segments.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="car-list-filters-label">
          <span className="car-list-filters-label-text">{LABELS.maker}</span>
          <select
            className="car-list-filters-select"
            value={filters.maker ?? ''}
            onChange={(e) => handleChange('maker', e.target.value || null)}
            aria-label={LABELS.maker}
          >
            <option value="">すべて</option>
            {makers.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </label>
        <label className="car-list-filters-label">
          <span className="car-list-filters-label-text">{LABELS.fuelType}</span>
          <select
            className="car-list-filters-select"
            value={filters.fuelType ?? ''}
            onChange={(e) => handleChange('fuelType', e.target.value || null)}
            aria-label={LABELS.fuelType}
          >
            <option value="">すべて</option>
            {fuelTypes.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </label>
      </div>
      {hasActiveFilters && (
        <button
          type="button"
          className="car-list-filters-reset"
          onClick={handleReset}
        >
          条件をクリア
        </button>
      )}
    </div>
  );
}

export default CarListFilters;
