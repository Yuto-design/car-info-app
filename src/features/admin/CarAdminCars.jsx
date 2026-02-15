import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import {
  deleteCar,
  getAllCars,
  resetCarsToSeed,
  updateCar,
} from '../../data/cars';
import CarAdminForm, { emptyForm, normalizeFormToCarPatch } from './CarAdminForm';

function carToForm(car) {
  return {
    name: car.name ?? '',
    maker: car.maker ?? '',
    segment: car.segment ?? '',
    fuelType: car.fuelType ?? '',
    driveType: car.driveType ?? '',
    price: car.price ?? '',
    lengthMm: car.lengthMm ?? '',
    widthMm: car.widthMm ?? '',
    heightMm: car.heightMm ?? '',
    weightKg: car.weightKg ?? '',
    wheelbaseMm: car.wheelbaseMm ?? '',
    minTurningRadiusM: car.minTurningRadiusM ?? '',
    maxPowerPs: car.maxPowerPs ?? '',
    maxPowerKw: car.maxPowerKw ?? '',
    maxTorqueNm: car.maxTorqueNm ?? '',
    displacementL: car.displacementL ?? '',
    fuelConsumption: car.fuelConsumption ?? '',
    image: car.image ?? '',
    description: car.description ?? '',
  };
}

function CarAdminCars() {
  const [cars, setCars] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const reload = () => setCars(getAllCars());

  useEffect(() => {
    reload();
  }, []);

  const startEdit = (car) => {
    setEditingId(car.id);
    setForm(carToForm(car));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const onChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const patch = normalizeFormToCarPatch(form);

    if (!patch.name) {
      alert('車名は必須です');
      return;
    }
    if (!patch.maker) {
      alert('メーカーは必須です');
      return;
    }

    updateCar(editingId, patch);
    reload();
    cancelEdit();
  };

  const onDelete = (id) => {
    const ok = window.confirm('この車種を削除しますか？');
    if (!ok) return;
    deleteCar(id);
    reload();
    if (editingId === id) cancelEdit();
  };

  const onResetSeed = () => {
    const ok = window.confirm('初期データに戻します（localStorage を上書きします）。よろしいですか？');
    if (!ok) return;
    resetCarsToSeed();
    reload();
    cancelEdit();
  };

  return (
    <div className="car-admin">
      <div className="car-admin-header">
        <p className="car-admin-desc">
          登録済みの車種を編集・削除できます。
        </p>
        <div className="car-admin-actions">
          <Button as={Link} to="/list" variant="secondary">車一覧へ</Button>
          <Button as={Link} to="/admin/register" variant="secondary">車を登録</Button>
          <Button type="button" variant="secondary" onClick={onResetSeed}>初期データに戻す</Button>
        </div>
      </div>

      {editingId != null && (
        <CarAdminForm
          title="車種を編集"
          form={form}
          onChange={onChange}
          onSubmit={onSubmit}
          submitLabel="更新する"
          onCancel={cancelEdit}
          cancelLabel="編集をやめる"
        />
      )}

      <section className="car-admin-card">
        <h2 className="car-admin-section-title">登録済みの車種</h2>
        <div className="car-admin-list">
          {cars.map((car) => (
            <div key={car.id} className="car-admin-row">
              <div className="car-admin-row-main">
                <strong className="car-admin-row-title">{car.maker} {car.name}</strong>
                <span className="car-admin-row-meta">{car.segment} / {car.fuelType} / {car.price != null && car.price > 0 ? `${Number(car.price).toLocaleString()}万円` : '—'}</span>
              </div>
              <div className="car-admin-row-actions">
                <Button type="button" variant="secondary" onClick={() => startEdit(car)}>編集</Button>
                <Button type="button" variant="secondary" onClick={() => onDelete(car.id)}>削除</Button>
              </div>
            </div>
          ))}
          {cars.length === 0 && (
            <p className="car-admin-empty">
              まだ車種がありません。<Link to="/admin/register">車を登録</Link>してください。
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default CarAdminCars;
