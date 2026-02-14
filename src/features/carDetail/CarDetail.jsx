import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCarBySlugOrId } from '../../data/cars';
import { isFavorite, addFavorite, removeFavorite } from '../../data/favorites';
import Button from '../../components/Button';
import SpecTable from './SpecTable';
import './CarDetail.css';

function CarDetail() {
  const { id: slugOrId } = useParams();
  const car = getCarBySlugOrId(slugOrId);
  const [favorited, setFavorited] = useState(() => car && isFavorite(car.id));

  if (!car) {
    return (
      <div className="car-detail car-detail--not-found">
        <p className="car-detail-not-found-message">指定の車種が見つかりません。</p>
        <Button as={Link} to="/list" variant="primary">車一覧へ戻る</Button>
      </div>
    );
  }

  const hasLength = car.lengthMm != null && car.lengthMm > 0;
  const hasWidth = car.widthMm != null && car.widthMm > 0;
  const hasHeight = car.heightMm != null && car.heightMm > 0;
  const sizeValue =
    hasLength && hasWidth && hasHeight
      ? `${Number(car.lengthMm).toLocaleString()}×${Number(car.widthMm).toLocaleString()}×${Number(car.heightMm).toLocaleString()} mm`
      : [hasLength && `全長 ${Number(car.lengthMm).toLocaleString()}mm`, hasWidth && `全幅 ${Number(car.widthMm).toLocaleString()}mm`, hasHeight && `全高 ${Number(car.heightMm).toLocaleString()}mm`].filter(Boolean).join(' / ') || null;

  const maxPowerValue = [car.maxPowerPs != null && car.maxPowerPs > 0 && `${car.maxPowerPs}PS`, car.maxPowerKw != null && car.maxPowerKw > 0 && `${car.maxPowerKw}kW`].filter(Boolean).join(' / ') || null;

  const specItems = [
    { label: 'メーカー', value: car.maker },
    { label: '車名', value: car.name },
    { label: 'セグメント', value: car.segment },
    { label: '燃料', value: car.fuelType },
    { label: '駆動方式', value: car.driveType },
    ...(car.price != null && car.price > 0 ? [{ label: '価格', value: `${Number(car.price).toLocaleString()}万円` }] : []),
    ...(sizeValue ? [{ label: '寸法（全長×全幅×全高）', value: sizeValue }] : []),
    ...(car.weightKg != null && car.weightKg > 0 ? [{ label: '車両重量', value: `${Number(car.weightKg).toLocaleString()}kg` }] : []),
    ...(car.wheelbaseMm != null && car.wheelbaseMm > 0 ? [{ label: 'ホイールベース', value: `${Number(car.wheelbaseMm).toLocaleString()}mm` }] : []),
    ...(car.minTurningRadiusM != null && car.minTurningRadiusM > 0 ? [{ label: '最小回転半径', value: `${car.minTurningRadiusM}m` }] : []),
    ...(maxPowerValue ? [{ label: '最高出力（PS/kW）', value: maxPowerValue }] : []),
    ...(car.maxTorqueNm != null && car.maxTorqueNm > 0 ? [{ label: '最大トルク（N・m）', value: `${car.maxTorqueNm}N・m` }] : []),
    ...(car.displacementL != null && car.displacementL > 0 ? [{ label: '排気量（L）', value: `${car.displacementL}L` }] : []),
    ...(car.fuelConsumption ? [{ label: '燃費（燃料消費率）', value: car.fuelConsumption }] : []),
  ];

  return (
    <div className="car-detail">
      <div className="car-detail-back">
        <Button as={Link} to="/list" variant="secondary">← 車一覧へ</Button>
      </div>

      <div className="car-detail-hero">
        <div className="car-detail-image-wrap">
          {car.image ? (
            <img src={car.image} alt={car.name} className="car-detail-image" />
          ) : (
            <div className="car-detail-image car-detail-image--placeholder" aria-hidden="true">
              <span>{car.maker} {car.name}</span>
            </div>
          )}
        </div>
        <div className="car-detail-head">
          <h1 className="car-detail-title">{car.maker} {car.name}</h1>
          <p className="car-detail-meta">{car.segment} / {car.fuelType}</p>
          {car.price != null && car.price > 0 && (
          <p className="car-detail-price">価格: {Number(car.price).toLocaleString()}万円</p>
        )}
          <Button
            type="button"
            variant={favorited ? 'secondary' : 'primary'}
            className="car-detail-favorite"
            onClick={() => {
              if (favorited) {
                removeFavorite(car.id);
                setFavorited(false);
              } else {
                addFavorite(car.id);
                setFavorited(true);
              }
            }}
            aria-pressed={favorited}
            aria-label={favorited ? 'お気に入りから外す' : 'お気に入りに追加'}
          >
            <i className={favorited ? 'fa-solid fa-heart' : 'fa-regular fa-heart'} aria-hidden></i>
            {favorited ? 'お気に入りから外す' : 'お気に入りに追加'}
          </Button>
        </div>
      </div>

      {car.description && (
        <section className="car-detail-section">
          <h2 className="car-detail-section-title">概要</h2>
          <p className="car-detail-description">{car.description}</p>
        </section>
      )}

      <section className="car-detail-section">
        <h2 className="car-detail-section-title">スペック</h2>
        <SpecTable items={specItems} />
      </section>
    </div>
  );
}

export default CarDetail;
