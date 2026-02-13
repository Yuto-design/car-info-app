import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import './Comparison.css';

function getSpecRows(cars) {
  if (!cars.length) return [];
  const labels = [
    { key: 'image', label: '画像', isImage: true },
    { key: 'maker', label: 'メーカー' },
    { key: 'name', label: '車名' },
    { key: 'segment', label: 'セグメント' },
    { key: 'bodyType', label: 'ボディタイプ' },
    { key: 'fuelType', label: '燃料' },
    { key: 'price', label: '価格帯' },
    { key: 'size', label: '寸法（全長×全幅×全高）' },
    { key: 'description', label: '概要' },
  ];
  return labels.map(({ key, label, isImage }) => ({
    key,
    label,
    isImage: !!isImage,
    values: cars.map((car) => {
      if (key === 'price') return car ? `${car.priceMin}〜${car.priceMax}万円` : '—';
      if (key === 'size') {
        if (!car || (car.lengthMm == null && car.widthMm == null && car.heightMm == null)) return '—';
        const parts = [];
        if (car.lengthMm != null) parts.push(`全長 ${Number(car.lengthMm).toLocaleString()}mm`);
        if (car.widthMm != null) parts.push(`全幅 ${Number(car.widthMm).toLocaleString()}mm`);
        if (car.heightMm != null) parts.push(`全高 ${Number(car.heightMm).toLocaleString()}mm`);
        return parts.join(' / ');
      }
      const v = car?.[key];
      return v != null && v !== '' ? String(v) : '—';
    }),
  }));
}

function ComparisonTable({ cars, onRemove }) {
  const specRows = useMemo(() => getSpecRows(cars), [cars]);

  return (
    <div className="comparison-table-wrap">
      <table className="comparison-table">
        <thead>
          <tr>
            <th className="comparison-table-label-cell" scope="col">
              項目
            </th>
            {cars.map((car) => (
              <th key={car.id} className="comparison-table-car-cell" scope="col">
                <div className="comparison-car-header">
                  <Link to={`/car/${car.slug || car.id}`} className="comparison-car-link">
                    {car.maker} {car.name}
                  </Link>
                  <Button
                    type="button"
                    variant="secondary"
                    className="comparison-remove"
                    onClick={(e) => onRemove(e, car.id)}
                    aria-label={`${car.maker} ${car.name}を比較から外す`}
                  >
                    <i className="fa-solid fa-xmark" aria-hidden></i>
                    外す
                  </Button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {specRows.map((row) => (
            <tr key={row.key} className="comparison-table-row">
              <th className="comparison-table-label-cell" scope="row">
                {row.label}
              </th>
              {row.values.map((value, i) => (
                <td key={cars[i]?.id ?? i} className="comparison-table-value-cell">
                  {row.isImage ? (
                    cars[i]?.image ? (
                      <Link to={`/car/${cars[i].slug || cars[i].id}`}>
                        <img
                          src={cars[i].image}
                          alt={cars[i].name}
                          className="comparison-car-image"
                        />
                      </Link>
                    ) : (
                      '—'
                    )
                  ) : (
                    value
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ComparisonTable;
