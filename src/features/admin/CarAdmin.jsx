import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import {
  addCar,
  deleteCar,
  getAllCars,
  resetCarsToSeed,
  updateCar,
} from '../../data/cars';
import './CarAdmin.css';

const emptyForm = {
  name: '',
  maker: '',
  segment: '',
  bodyType: '',
  fuelType: '',
  priceMin: '',
  priceMax: '',
  lengthMm: '',
  widthMm: '',
  heightMm: '',
  image: '',
  description: '',
};

function normalizeFormToCarPatch(form) {
  return {
    name: String(form.name ?? '').trim(),
    maker: String(form.maker ?? '').trim(),
    segment: String(form.segment ?? '').trim(),
    bodyType: String(form.bodyType ?? '').trim(),
    fuelType: String(form.fuelType ?? '').trim(),
    priceMin: form.priceMin === '' ? 0 : Number(form.priceMin),
    priceMax: form.priceMax === '' ? 0 : Number(form.priceMax),
    lengthMm: form.lengthMm !== '' && form.lengthMm != null ? Number(form.lengthMm) : undefined,
    widthMm: form.widthMm !== '' && form.widthMm != null ? Number(form.widthMm) : undefined,
    heightMm: form.heightMm !== '' && form.heightMm != null ? Number(form.heightMm) : undefined,
    image: String(form.image ?? '').trim(),
    description: String(form.description ?? '').trim(),
  };
}

function CarAdmin() {
  const [cars, setCars] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const isEditing = useMemo(() => Boolean(editingId), [editingId]);

  const reload = () => setCars(getAllCars());

  useEffect(() => {
    reload();
  }, []);

  const startEdit = (car) => {
    setEditingId(car.id);
    setForm({
      name: car.name ?? '',
      maker: car.maker ?? '',
      segment: car.segment ?? '',
      bodyType: car.bodyType ?? '',
      fuelType: car.fuelType ?? '',
      priceMin: car.priceMin ?? '',
      priceMax: car.priceMax ?? '',
      lengthMm: car.lengthMm ?? '',
      widthMm: car.widthMm ?? '',
      heightMm: car.heightMm ?? '',
      image: car.image ?? '',
      description: car.description ?? '',
    });
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

    if (isEditing) {
      updateCar(editingId, patch);
    } else {
      addCar(patch);
    }

    reload();
    cancelEdit();
  };

  const onDelete = (id) => {
    // eslint-disable-next-line no-alert
    const ok = window.confirm('この車種を削除しますか？');
    if (!ok) return;
    deleteCar(id);
    reload();
    if (editingId === id) cancelEdit();
  };

  const onResetSeed = () => {
    // eslint-disable-next-line no-alert
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
          車種情報を手入力で追加・編集できます。
        </p>
        <div className="car-admin-actions">
          <Button as={Link} to="/list" variant="secondary">車一覧へ</Button>
          <Button type="button" variant="secondary" onClick={onResetSeed}>初期データに戻す</Button>
        </div>
      </div>

      <section className="car-admin-card">
        <h2 className="car-admin-section-title">{isEditing ? '車種を編集' : '車種を追加'}</h2>

        <form className="car-admin-form" onSubmit={onSubmit}>
          <div className="car-admin-grid">
            <label className="car-admin-label">
              <span className="car-admin-label-text">車名（必須）</span>
              <input className="car-admin-input" value={form.name} onChange={(e) => onChange('name', e.target.value)} />
            </label>
            <label className="car-admin-label">
              <span className="car-admin-label-text">メーカー（必須）</span>
              <input className="car-admin-input" value={form.maker} onChange={(e) => onChange('maker', e.target.value)} />
            </label>
            <label className="car-admin-label">
              <span className="car-admin-label-text">セグメント</span>
              <input className="car-admin-input" value={form.segment} onChange={(e) => onChange('segment', e.target.value)} placeholder="例: コンパクト / SUV" />
            </label>
            <label className="car-admin-label">
              <span className="car-admin-label-text">ボディタイプ</span>
              <input className="car-admin-input" value={form.bodyType} onChange={(e) => onChange('bodyType', e.target.value)} placeholder="例: ハッチバック" />
            </label>
            <label className="car-admin-label">
              <span className="car-admin-label-text">燃料</span>
              <input className="car-admin-input" value={form.fuelType} onChange={(e) => onChange('fuelType', e.target.value)} placeholder="例: ガソリン / ハイブリッド" />
            </label>
            <label className="car-admin-label">
              <span className="car-admin-label-text">価格（最低・万円）</span>
              <input className="car-admin-input" type="number" min={0} value={form.priceMin} onChange={(e) => onChange('priceMin', e.target.value)} />
            </label>
            <label className="car-admin-label">
              <span className="car-admin-label-text">価格（最高・万円）</span>
              <input className="car-admin-input" type="number" min={0} value={form.priceMax} onChange={(e) => onChange('priceMax', e.target.value)} />
            </label>
            <label className="car-admin-label">
              <span className="car-admin-label-text">全長（mm）</span>
              <input className="car-admin-input" type="number" min={0} value={form.lengthMm} onChange={(e) => onChange('lengthMm', e.target.value)} placeholder="例: 4520" />
            </label>
            <label className="car-admin-label">
              <span className="car-admin-label-text">全幅（mm）</span>
              <input className="car-admin-input" type="number" min={0} value={form.widthMm} onChange={(e) => onChange('widthMm', e.target.value)} placeholder="例: 1780" />
            </label>
            <label className="car-admin-label">
              <span className="car-admin-label-text">全高（mm）</span>
              <input className="car-admin-input" type="number" min={0} value={form.heightMm} onChange={(e) => onChange('heightMm', e.target.value)} placeholder="例: 1470" />
            </label>
            <label className="car-admin-label car-admin-label--wide">
              <span className="car-admin-label-text">画像URL</span>
              <input className="car-admin-input" value={form.image} onChange={(e) => onChange('image', e.target.value)} placeholder="https://..." />
            </label>
            <label className="car-admin-label car-admin-label--wide">
              <span className="car-admin-label-text">説明</span>
              <textarea className="car-admin-textarea" rows={4} value={form.description} onChange={(e) => onChange('description', e.target.value)} />
            </label>
          </div>

          <div className="car-admin-form-actions">
            <Button type="submit" variant="primary">{isEditing ? '更新する' : '追加する'}</Button>
            {isEditing && (
              <Button type="button" variant="secondary" onClick={cancelEdit}>編集をやめる</Button>
            )}
          </div>
        </form>
      </section>

      <section className="car-admin-card">
        <h2 className="car-admin-section-title">登録済みの車種</h2>
        <div className="car-admin-list">
          {cars.map((car) => (
            <div key={car.id} className="car-admin-row">
              <div className="car-admin-row-main">
                <strong className="car-admin-row-title">{car.maker} {car.name}</strong>
                <span className="car-admin-row-meta">{car.segment} / {car.fuelType} / {car.priceMin}〜{car.priceMax}万円</span>
              </div>
              <div className="car-admin-row-actions">
                <Button type="button" variant="secondary" onClick={() => startEdit(car)}>編集</Button>
                <Button type="button" variant="secondary" onClick={() => onDelete(car.id)}>削除</Button>
              </div>
            </div>
          ))}
          {cars.length === 0 && (
            <p className="car-admin-empty">まだ車種がありません。上のフォームから追加してください。</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default CarAdmin;

