import Button from '../../components/Button';
import '../styles/CarAdmin.css';

export const emptyForm = {
  name: '',
  maker: '',
  segment: '',
  fuelType: '',
  driveType: '',
  price: '',
  lengthMm: '',
  widthMm: '',
  heightMm: '',
  weightKg: '',
  wheelbaseMm: '',
  minTurningRadiusM: '',
  maxPowerPs: '',
  maxPowerKw: '',
  maxTorqueNm: '',
  displacementL: '',
  fuelConsumption: '',
  image: '',
  description: '',
};

export function normalizeFormToCarPatch(form) {
  return {
    name: String(form.name ?? '').trim(),
    maker: String(form.maker ?? '').trim(),
    segment: String(form.segment ?? '').trim(),
    fuelType: String(form.fuelType ?? '').trim(),
    driveType: form.driveType !== '' && form.driveType != null ? String(form.driveType).trim() : undefined,
    price: form.price !== '' && form.price != null ? Number(form.price) : undefined,
    lengthMm: form.lengthMm !== '' && form.lengthMm != null ? Number(form.lengthMm) : undefined,
    widthMm: form.widthMm !== '' && form.widthMm != null ? Number(form.widthMm) : undefined,
    heightMm: form.heightMm !== '' && form.heightMm != null ? Number(form.heightMm) : undefined,
    weightKg: form.weightKg !== '' && form.weightKg != null ? Number(form.weightKg) : undefined,
    wheelbaseMm: form.wheelbaseMm !== '' && form.wheelbaseMm != null ? Number(form.wheelbaseMm) : undefined,
    minTurningRadiusM: form.minTurningRadiusM !== '' && form.minTurningRadiusM != null ? Number(form.minTurningRadiusM) : undefined,
    maxPowerPs: form.maxPowerPs !== '' && form.maxPowerPs != null ? Number(form.maxPowerPs) : undefined,
    maxPowerKw: form.maxPowerKw !== '' && form.maxPowerKw != null ? Number(form.maxPowerKw) : undefined,
    maxTorqueNm: form.maxTorqueNm !== '' && form.maxTorqueNm != null ? Number(form.maxTorqueNm) : undefined,
    displacementL: form.displacementL !== '' && form.displacementL != null ? Number(form.displacementL) : undefined,
    fuelConsumption: form.fuelConsumption != null && String(form.fuelConsumption).trim() !== '' ? String(form.fuelConsumption).trim() : undefined,
    image: String(form.image ?? '').trim(),
    description: String(form.description ?? '').trim(),
  };
}

function CarAdminForm({ title, form, onChange, onSubmit, submitLabel, onCancel, cancelLabel }) {
  return (
    <section className="car-admin-card">
      <h2 className="car-admin-section-title">{title}</h2>
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
            <span className="car-admin-label-text">燃料</span>
            <input className="car-admin-input" value={form.fuelType} onChange={(e) => onChange('fuelType', e.target.value)} placeholder="例: ガソリン / ハイブリッド" />
          </label>
          <label className="car-admin-label">
            <span className="car-admin-label-text">駆動方式</span>
            <select className="car-admin-input" value={form.driveType} onChange={(e) => onChange('driveType', e.target.value)}>
              <option value="">—</option>
              <option value="FF">FF（前輪駆動）</option>
              <option value="FR">FR（後輪駆動）</option>
              <option value="4WD">4WD（四輪駆動）</option>
            </select>
          </label>
          <label className="car-admin-label">
            <span className="car-admin-label-text">価格（万円）</span>
            <input className="car-admin-input" type="number" min={0} value={form.price} onChange={(e) => onChange('price', e.target.value)} placeholder="例: 300" />
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
          <label className="car-admin-label">
            <span className="car-admin-label-text">車両重量（kg）</span>
            <input className="car-admin-input" type="number" min={0} value={form.weightKg} onChange={(e) => onChange('weightKg', e.target.value)} placeholder="例: 1420" />
          </label>
          <label className="car-admin-label">
            <span className="car-admin-label-text">ホイールベース（mm）</span>
            <input className="car-admin-input" type="number" min={0} value={form.wheelbaseMm} onChange={(e) => onChange('wheelbaseMm', e.target.value)} placeholder="例: 2700" />
          </label>
          <label className="car-admin-label">
            <span className="car-admin-label-text">最小回転半径（m）</span>
            <input className="car-admin-input" type="number" min={0} step="0.1" value={form.minTurningRadiusM} onChange={(e) => onChange('minTurningRadiusM', e.target.value)} placeholder="例: 5.2" />
          </label>
          <label className="car-admin-label">
            <span className="car-admin-label-text">最高出力（PS）</span>
            <input className="car-admin-input" type="number" min={0} value={form.maxPowerPs} onChange={(e) => onChange('maxPowerPs', e.target.value)} placeholder="例: 122" />
          </label>
          <label className="car-admin-label">
            <span className="car-admin-label-text">最高出力（kW）</span>
            <input className="car-admin-input" type="number" min={0} step="0.1" value={form.maxPowerKw} onChange={(e) => onChange('maxPowerKw', e.target.value)} placeholder="例: 90" />
          </label>
          <label className="car-admin-label">
            <span className="car-admin-label-text">最大トルク（N・m）</span>
            <input className="car-admin-input" type="number" min={0} value={form.maxTorqueNm} onChange={(e) => onChange('maxTorqueNm', e.target.value)} placeholder="例: 142" />
          </label>
          <label className="car-admin-label">
            <span className="car-admin-label-text">排気量（L）</span>
            <input className="car-admin-input" type="number" min={0} step="0.1" value={form.displacementL} onChange={(e) => onChange('displacementL', e.target.value)} placeholder="例: 1.8" />
          </label>
          <label className="car-admin-label">
            <span className="car-admin-label-text">燃費（燃料消費率）</span>
            <input className="car-admin-input" value={form.fuelConsumption} onChange={(e) => onChange('fuelConsumption', e.target.value)} placeholder="例: 20.0km/L" />
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
          <Button type="submit" variant="primary">{submitLabel}</Button>
          {onCancel && (
            <Button type="button" variant="secondary" onClick={onCancel}>{cancelLabel}</Button>
          )}
        </div>
      </form>
    </section>
  );
}

export default CarAdminForm;
